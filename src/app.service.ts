import commonConf from '@config/commonConf';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(commonConf.KEY)
    private readonly commonConfig: ConfigType<typeof commonConf>,
  ) {}

  getVersion(): string {
    return this.commonConfig.version;
  }
}
