export const map2List = <
  T extends { childs: (string | number)[]; [key: string]: any },
  K extends string,
  PK extends string,
>(
  map: Record<string, T>,
  option: { key: K; parentKey: PK },
) => {
  const { key, parentKey } = option;
  const res: (T & Record<K | PK, T[K]>)[] = [];
  const childs: any[] = [];
  const objKeys = Object.keys(map);
  const changeType = typeof map[objKeys[0]] === 'string' ? String : Number;

  objKeys.forEach((item) => {
    map[item].childs.forEach((childKey) => {
      childs.push(childKey);

      res.push({
        ...(map[childKey] as any),
        [key]: map[childKey][key],
        [parentKey]: changeType(item),
      });
    });
  });

  const rootKeys = objKeys.filter((objKey) => !childs.includes(objKey));
  rootKeys.forEach((rootKey) => {
    res.push({ ...(map[rootKey] as any), [parentKey]: null });
  });
  return res;
};
