import {
  JWT_SECRET_KEY,
  PASSWORD_SECRET_KEY,
  SESSION_SECRET_KEY,
} from '@common/variables/environments';
import { registerAs } from '@nestjs/config';

const secretConf = {
  jwt: JWT_SECRET_KEY,
  password: PASSWORD_SECRET_KEY,
  session: SESSION_SECRET_KEY,
};

export default registerAs('secret', () => secretConf);

export type SecretConf = () => typeof secretConf;
