export const uppercaseFirstLetter = (word: string) => {
  if (!word.length) return "";
  const firstLetterCap = word.charAt(0).toUpperCase();

  const remainingLetters = word.slice(1);

  return firstLetterCap + remainingLetters;
};
