/* eslint-disable @typescript-eslint/no-shadow */
export const findParents = <T extends { children?: T[] }>(
  array: T[],
  code: any,
  key: string,
): T[] => {
  const stack: T[] = [];
  let going = true;
  const walker = (array: T[], code: any) => {
    array.forEach((item) => {
      if (!going) return;
      stack.push(item);
      if (item[key] === code) {
        going = false;
      } else if (item.children) {
        walker(item.children, code);
      } else {
        stack.pop();
      }
    });
    if (going) stack.pop();
  };
  walker(array, code);
  return stack;
};
