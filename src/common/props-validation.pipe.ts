import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PropsValidationPipe implements PipeTransform {
  constructor(private readonly args?: { exclude?: string[] }) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata, value);

    if (!metadata.metatype) {
      return value;
    }

    if (typeof value !== 'object') {
      throw new BadRequestException();
    }

    const object = new metadata.metatype();
    const keys = Object.keys(value);

    for (const key of keys) {
      const isExclude = this.args?.exclude?.includes(key);
      if (!(key in object) || isExclude) {
        if (isExclude) {
          console.log(`예외처리된 키 입력: [${key}]`);
        } else {
          console.log(`잘못된 키 입력: [${key}]`);
        }
        throw new BadRequestException('잘못된 요청입니다.');
      }
    }

    return value;
  }
}
