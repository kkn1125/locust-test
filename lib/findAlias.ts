import { exec } from 'child_process';
import * as path from 'path';

export function findAlias(depth: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const srcPath = path.join(path.resolve(), 'src');
    exec(`find ${srcPath} -type d -maxdepth ${depth}`, (err, stdout) => {
      if (err) {
        console.error(err);
        reject(new Error('Alias 찾는 중 오류가 발생했습니다.', err));
      }
      const aliases = stdout
        .split('\n')
        .filter((line) => line)
        .map((line) =>
          line.endsWith('src') ? 'src/' : 'src' + line.replace(srcPath, ''),
        );
      resolve(aliases);
    });
  });
}
