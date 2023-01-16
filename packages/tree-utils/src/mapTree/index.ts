type MapTreeResult<U, CField extends string> = (U &
  Record<CField, MapTreeResult<U, CField> | undefined>)[];
/**
 *
 * @param tree 树数据
 * @param handler 处理函数
 * @param field 子树字段名
 * @param newField 子树新字段名
 * @returns
 */
export const mapTree = <T, U, K extends string = 'children', KK extends string = K>(
  tree: T[],
  handler: (item: T) => U,
  field?: K,
  newField?: KK,
): MapTreeResult<U, KK> => {
  if (!(tree instanceof Array)) throw new Error('tree is not Array');
  const fieldName = field ?? 'children';
  const newFieldName = newField ?? 'children';

  const result = tree.reduce((acc: any, cur: any) => {
    const handleItem = handler(cur);
    if (!cur[fieldName]) {
      return acc.concat({ ...handleItem, [newFieldName]: undefined });
    } else {
      const children = mapTree(cur[fieldName], handler, field, newField);
      return acc.concat({
        ...handleItem,
        [newFieldName]: children,
      });
    }
  }, []);
  return result;
};
