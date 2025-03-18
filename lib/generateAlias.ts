import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';

export async function generateAlias(
  config: any,
  alias: [string, [string]][],
) {
  Object.assign(config.compilerOptions, { paths: Object.fromEntries(alias) });
  const content = JSON.stringify(config, null, 2);
  const prettyContent = await prettier.format(content, {
    parser: 'json',
  });
  await fs.writeFile(path.join(path.resolve(), 'tsconfig.json'), prettyContent);
}
