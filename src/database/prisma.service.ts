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

  const extension = Prisma.defineExtension({
    name: 'customExtension',
    model: {
      $allModels: { softDelete },
      user: { createHashPassword, verifyPassword },
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
  }

  get client() {
    if (!this._client) this._client = prismaExtension(this, this.commonService);
    return this._client;
  }
}
