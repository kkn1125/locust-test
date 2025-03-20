import { CommonService } from '@common/common.service';
import { SecretConf } from '@config/secretConf';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

export type ExtensionType = ReturnType<typeof prismaExtension>;

const prismaExtension = (
  client: PrismaClient,
  commonService: CommonService,
) => {
  const secret = commonService.getConfig<SecretConf>('secret');
  const userSelect = {
    id: true,
    username: true,
    email: true,
    role: true,
    state: true,
    createdAt: true,
  };

  async function softDelete<
    Model,
    Args extends Prisma.Args<Model, 'delete' | 'deleteMany'>,
  >(this: Model, args?: Args) {
    const argsCopy = args ?? {};
    Object.assign(argsCopy, {
      data: { deletedAt: new Date() },
    });
    const context = Prisma.getExtensionContext(this) as any;
    const item = await context.update(argsCopy);
    return { item };
  }

  function createHashPassword(password: string) {
    const keyLength = secret.keyLength;
    const iteration = secret.iteration;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, iteration, keyLength, 'sha512')
      .toString(secret.encodeType);

    return { iteration, salt, hash };
  }

  function verifyPassword(
    password: string,
    storedPassword: string,
    salt: string,
    iteration: number,
  ) {
    const keyLength = secret.keyLength;
    const hash = crypto
      .pbkdf2Sync(password, salt, iteration, keyLength, 'sha512')
      .toString(secret.encodeType);
    return hash === storedPassword;
  }

  function isExists(user: UserTokenData) {
    return client.user.findUniqueOrThrow({
      where: { id: user.id },
      select: userSelect,
    });
  }

  const extension = Prisma.defineExtension({
    name: 'customExtension',
    model: {
      $allModels: { softDelete },
      user: {
        isExists,
        createHashPassword,
        verifyPassword,
        get select() {
          return userSelect;
        },
      },
    },
    query: {
      $allModels: {
        $allOperations: ({ model, operation, args, query }) => {
          if (operation.startsWith('find')) {
            if ('where' in args && typeof args.where === 'object') {
              Object.assign(args.where, {
                deletedAt: null,
              });
            } else {
              Object.assign(args, {
                where: {
                  deletedAt: null,
                },
              });
            }
          }
          return query(args);
        },
      },
    },
  });

  return client.$extends(extension);
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  _client!: ExtensionType;

  constructor(private readonly commonService: CommonService) {
    super({
      log: ['query', 'error'],
      // errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();
    if (!this._client) this._client = prismaExtension(this, this.commonService);
  }

  get client() {
    return this._client;
  }
}
