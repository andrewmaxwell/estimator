export const groupBy = <T, K extends keyof any>(
  arr: T[],
  getKey: (i: T) => K,
) =>
  arr.reduce(
    (groups, item) => {
      (groups[getKey(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
