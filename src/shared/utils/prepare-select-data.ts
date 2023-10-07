import { FilterCountry, FilterGenre } from '~/shared/types/api/filter/filter';
import { uppercaseFirstLetter } from '~/shared/utils/uppercase-first-letter';

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
