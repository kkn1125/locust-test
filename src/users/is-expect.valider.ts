import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsExpectConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (typeof +value !== 'number') {
      return false;
    }
    return Object.values(validationArguments?.constraints[0]).includes(value);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `사용자 [${validationArguments?.property}] 범위를 벗어나는 설정입니다.`;
  }
}

export function IsExpect<T>(
  rangeConstraint: T,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [rangeConstraint],
      validator: IsExpectConstraint,
    });
  };
}
