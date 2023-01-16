export const list2Map = <KeyType = any, T extends Record<string, any> = any>(
  list: T[],
  option: { key: keyof T; parentKey: keyof T },
) => {
  const { key, parentKey } = option;

  const map: Record<any, T & { childs: KeyType[] }> = {};

  list.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = {
        ...item,
        childs: [],
      };
    }

    if (!item[parentKey]) return;

    if (map[item[parentKey]]) {
      map[item[parentKey]].childs.push(item[key]);
    } else {
      map[item[parentKey]] = {
        childs: [item],
      } as any;
    }
  });

  return map;
};
