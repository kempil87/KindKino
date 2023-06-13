export type ApiPaginationResponse<T> = T & {
  pagesCount: number;
};

export interface PaginationParams {
  page: number;
}

export interface ApiFetchCommonParams {
  filmId?: number | string;
  id?: number | string;
}
