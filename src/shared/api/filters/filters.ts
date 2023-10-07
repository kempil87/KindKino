import { apiRequest } from '~/shared/api';
import { ApiFilter } from '~/shared/types/api/filter/filter';

export const fetchFilters = (): ApiFilter['res'] =>
  apiRequest({
    url: '/films/filters',
  });
