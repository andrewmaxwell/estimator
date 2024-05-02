const fractions = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];

export const formatToNearestEighth = (num: number) => {
  const nearestEighth = Math.round(num * 8) / 8;
  const integerPart = Math.floor(nearestEighth);
  const eighths = Math.round((nearestEighth - integerPart) * 8);
  return (integerPart > 0 ? integerPart : '') + fractions[eighths];
};
