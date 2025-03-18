import { HOST, PORT } from './environments';
import * as pkg from '../../../package.json';

export const DEFAULT_LOG_CONTEXT = 'System';
export const LOG_FORMAT = 'YYYY.MM.DD HH:mm:ss.SSS';
export const ALLOWED_HOST = [HOST];
export const ALLOWED_PORT = [PORT];
export const VERSION = pkg.version;
