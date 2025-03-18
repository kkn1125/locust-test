import { ResponseFormat } from './response.format';

export function SuccessResponseFormat<T>(status: number, data: T) {
  const format = new ResponseFormat();
  format.ok = [200, 201].includes(status);
  format.status = status;
  format.payload = data;
  return format;
}

export function ErrorResponseFormat(
  status: number,
  message: any,
  detail?: string,
) {
  const format = new ResponseFormat();
  format.ok = [200, 201].includes(status);
  format.status = status;
  format.message = message;
  format.detail = detail;
  return format;
}
