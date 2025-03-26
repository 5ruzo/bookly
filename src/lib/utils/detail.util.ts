export const sliceNumber = (num: string): string => {
  const numStr = num.toString();
  if (numStr.length > 8) {
    return `${numStr.slice(0, 8)}...`;
  }
  return numStr;
};
