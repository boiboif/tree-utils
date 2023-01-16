export const treeFindItem = <T>(
  tree: T[],
  handler: (v: T) => boolean,
  childKey = 'children',
): T | undefined | null => {
  if (!(tree instanceof Array)) return null;
  let result: T | undefined;

  const walker = (array: T[]) => {
    if (result) return;
    array.forEach((item) => {
      if (handler(item)) {
        result = item;
      }
      if (item[childKey]) {
        walker(item[childKey]);
      }
    });
  };
  walker(tree);

  return result;
};
