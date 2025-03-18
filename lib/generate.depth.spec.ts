import { describe, expect, it, vitest } from 'vitest';
import { readInput } from './readInput';
import { existsTsconfig } from './existsTsconfig';
import { findAlias } from './findAlias';
import * as tsconfig from '../tsconfig.json';
import { generateAlias } from './generateAlias';
import { convertAlias } from './convertAlias';

describe('[Alias 생성] 단위 테스트', () => {
  it('[구상] 흐름 테스트', () => {
    expect(readInput).toBeDefined();
  });

  it('[입력 받기] 사용자 입력 테스트', async () => {
    const once = { readInput };
    const spy = vitest.spyOn(once, 'readInput');
    spy.mockReturnValue(Promise.resolve(true));
    const result = await once.readInput();
    expect(result).toBeTruthy();
  });

  it('[파일 찾기] tsconfig.json 찾기', async () => {
    expect(existsTsconfig).toBeDefined();
    const tsconfig = await existsTsconfig('tsconfig.json');
    console.log(tsconfig);
    expect(tsconfig).toBeDefined();
  });

  it('[Alias 리스트 찾기] Alias 리스트 검색', async () => {
    const alias = await findAlias(1);
    console.log(alias);
    expect(alias).toBeDefined();
  });

  it('[Alias 생성] Alias 자동 생성', async () => {
    const config = await existsTsconfig('tsconfig.json');
    const json = JSON.parse(config) as typeof tsconfig;
    const alias = await findAlias(1);
    const aliasList = convertAlias(alias);
    await generateAlias(json, aliasList);
  });
});
