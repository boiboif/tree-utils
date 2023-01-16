/* eslint-disable @typescript-eslint/no-shadow */
export const tree2List = <T, K1 extends string>(
  tree: T[],
  option: { key: keyof T; parentKey: K1; childrenKey: keyof T },
): (T & Record<K1, string>)[] => {
  if (!(tree instanceof Array)) {
    throw new Error('Tree is not Array!');
  }

  const { key, parentKey, childrenKey } = option;
  const list: any[] = [];
  const keyStack: string[] = [];

  const goTree = (tree: T[]) => {
    tree.forEach((item) => {
      const childs = item[childrenKey];
      if (childs instanceof Array) {
        keyStack.push(...Array(childs.length).fill(item[key]));
        goTree(childs);
      }
      delete item[childrenKey];
      list.push({ ...item, [parentKey]: keyStack.pop() ?? null });
    });
  };
  goTree(tree);

  return list;
};
