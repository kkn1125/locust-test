import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const RUN_MODE = process.env.NODE_ENV ?? 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
if (fs.existsSync(`.env.${RUN_MODE}`)) {
  dotenv.config({
    path: path.join(path.resolve(), `.env.${RUN_MODE}`),
    override: true,
  });
}

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = +(process.env.PORT || 8080);
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY as string;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;
