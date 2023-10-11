import {SelectOption} from '~/components/select/select';

export const createYearOptions = (): SelectOption[] => {
  const currentYear = new Date().getFullYear();

  return Array.from({length: currentYear - 1949}, (_, i) => ({
    label: String(currentYear - i),
    value: currentYear - i
  }));
};
