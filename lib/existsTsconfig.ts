import * as fs from 'fs/promises';
import * as path from 'path';

export async function existsTsconfig(tsconfigName: string = 'tsconfig.json') {
  const file = await fs.readFile(path.join(path.resolve(), tsconfigName), {
    encoding: 'utf-8',
  });
  return file;
}
