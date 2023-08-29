import { uppercaseFirstLetter } from "~/shared/helpers/uppercase-first-letter";
import { FilterCountry, FilterGenre } from "~/shared/types/api/filter/filter";

export const prepareSelectCountries = (countries?: FilterCountry[]) => {
  if (countries && !countries.length) return [];

  return countries?.map((el) => ({ label: el.country, value: el.id }));
};

export const prepareSelectGenres = (genres?: FilterGenre[]) => {
  if (genres && !genres.length) return [];

  return genres?.map((el) => ({
    label: uppercaseFirstLetter(el.genre),
    value: el.id,
  }));
};
