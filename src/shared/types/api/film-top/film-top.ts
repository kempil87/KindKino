import { ApiPaginationResponse } from '~/shared/types/api';
import { FilmsRequest, FilmsResponse } from '~/shared/types/film/film';

export interface ApiFilms {
  req: FilmsRequest;
  res: Promise<ApiPaginationResponse<FilmsResponse>>;
}
