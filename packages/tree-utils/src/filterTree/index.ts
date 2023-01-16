/**
 * 过滤树
 * @param tree 树
 * @param handler 处理函数
 * @returns
 */
export const filterTree = <T>(
  tree: T[],
  handler: (arg: T) => boolean,
  fieldName = 'children',
): T[] => {
  if (!(tree instanceof Array)) return [];
  const result = tree.reduce((acc: any, cur: any) => {
    const flag = handler(cur);
    if (flag || filterTree(cur[fieldName], handler, fieldName).length > 0) {
      if (!cur[fieldName]) {
        return acc.concat(cur);
      } else {
        const children = filterTree(cur[fieldName], handler, fieldName);
        return acc.concat({
          ...cur,
          [fieldName]: children,
        });
      }
    }

    return acc;
  }, []);

  return result;
};
