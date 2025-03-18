import { CommonConf } from '@config/commonConf';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class CommonService {
  private allowedHosts: Set<string>;
  private allowedPorts: Set<number>;

  constructor(private readonly configService: ConfigService) {
    const common = this.getConfig<CommonConf>('common');
    this.allowedHosts = new Set([common.host]);
    this.allowedPorts = new Set([common.port]);
  }

  get allowOrigins(): string[] {
    const origins: string[] = [];
    this.allowedHosts.forEach((host) =>
      this.allowedPorts.forEach((port) => {
        const protocol = port === 443 ? 'https' : 'http';
        const domain = port === 443 || port === 80 ? host : host + ':' + port;
        origins.push(`${protocol}://${domain}`);
      }),
    );
    return origins;
  }

  addHost(host: string) {
    this.allowedHosts.add(host);
  }

  addPort(port: number) {
    this.allowedPorts.add(port);
  }

  getConfig<T extends (...args: any) => any>(
    configName: string,
  ): ConfigType<T> {
    return this.configService.get<T>(configName, {
      infer: true,
    }) as ConfigType<T>;
  }
}
