import * as readline from 'readline';

export function readInput() {
  return new Promise<boolean>((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on('line', (input) => {
      if (input === 'y') resolve(input === 'y');
      else {
        reject(new Error('Alias 생성을 취소합니다.'));
        rl.close();
        process.exit(1);
      }
    });
  });
}
