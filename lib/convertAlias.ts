export function convertAlias(alias: string[]): [string, [string]][] {
  return alias
    .map((a) => [
      a.replace('src/', '@') + '/*',
      [a + (a === 'src/' ? '*' : '/*')],
    ])
    .toReversed() as [string, [string]][];
}
