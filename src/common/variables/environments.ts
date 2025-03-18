import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = +(process.env.PORT || 8080);
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY as string;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;
