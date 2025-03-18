import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsDuplicateConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    value: any,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const name = validationArguments.property;
    const where = {
      [name]: value,
    } as Prisma.UserWhereUniqueInput;
    const user = await this.prisma.user.findFirst({ where });
    if (user) {
      return false;
    }

    return true;
  }

  defaultMessage?(validationArguments: ValidationArguments): string {
    return `이미 사용중인 ${validationArguments.property}입니다.`;
  }
}

export function IsDuplicate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDuplicateConstraint,
    });
  };
}
