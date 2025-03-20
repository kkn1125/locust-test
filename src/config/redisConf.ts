import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from '@common/variables/environments';
import { registerAs } from '@nestjs/config';

const redisConf = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
} as const;

export default registerAs('redis', () => redisConf);

export type RedisConf = () => typeof redisConf;
