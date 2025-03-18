import {
  JWT_SECRET_KEY,
  PASSWORD_SECRET_KEY,
  SESSION_SECRET_KEY,
} from '@common/variables/environments';
import { registerAs } from '@nestjs/config';

const secretConf = {
  cookieName: {
    refresh: 'refresh',
  },
  iteration: 104906,
  keyLength: 64,
  encodeType: 'base64',
  jwt: JWT_SECRET_KEY,
  password: PASSWORD_SECRET_KEY,
  session: SESSION_SECRET_KEY,
} as const;

export default registerAs('secret', () => secretConf);

export type SecretConf = () => typeof secretConf;
