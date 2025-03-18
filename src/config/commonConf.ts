import { VERSION } from '@common/variables/constants';
import { HOST, PORT } from '@common/variables/environments';
import { registerAs } from '@nestjs/config';

const commonConf = {
  host: HOST ?? '0.0.0.0',
  port: +(PORT ?? 8080),
  version: VERSION,
} as const;

export default registerAs('common', () => commonConf);

export type CommonConf = (...args: any) => typeof commonConf;
