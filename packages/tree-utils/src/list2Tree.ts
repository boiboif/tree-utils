export const list2Tree = <T>(
  list: T[],
  option: { key: keyof T; parentKey: keyof T; root?: string },
): (T & { children: T })[] => {
  if (!(list instanceof Array)) {
    throw new Error('List is not Array!');
  }

  const { key, parentKey, root } = option;
  const tempList: any[] = JSON.parse(JSON.stringify(list));

  const map: Record<string, any[]> = {};

  tempList.forEach((item) => {
    if (!map[item[parentKey]]) {
      map[item[parentKey]] = [];
    }
    map[item[parentKey]].push(item);
  });

  return tempList.filter((item) => {
    const childs = map[item[key]];
    if (childs?.length > 0) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(...childs);
    } else {
      item.children = [];
    }

    if (!item[parentKey] || item[parentKey] === root) {
      return item;
    }
  });
};
