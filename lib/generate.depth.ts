import { convertAlias } from './convertAlias';
import { generateAlias } from './generateAlias';
import { findAlias } from './findAlias';
import { existsTsconfig } from './existsTsconfig';
import { readInput } from './readInput';

(async function (depth: number = 1) {
  console.log(`깊이 ${depth}로 탐색합니다.`);

  const config = await existsTsconfig('tsconfig.json');
  const json = JSON.parse(config);

  if (json.compilerOptions.paths) {
    const result = await readInput();
    if (!result) return;
  }

  const alias = await findAlias(1);
  const aliasList = convertAlias(alias);
  await generateAlias(json, aliasList);
})()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
