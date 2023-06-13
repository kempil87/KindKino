import { apiRequest } from '~/shared/api';
import { ApiFetchCommonParams } from '~/shared/types/api';
import { ApiFilmStaff, ApiStaff } from "~/shared/types/api/staff/staff";

export const fetchStaff = {
  film: (params: ApiFetchCommonParams): ApiFilmStaff['res'] =>
    apiRequest({ params, url: '/staff', v1: true }),
  view: (params: ApiFetchCommonParams): ApiStaff['res'] =>
    apiRequest({ url: `/staff/${params.id}`, v1: true }),
};
