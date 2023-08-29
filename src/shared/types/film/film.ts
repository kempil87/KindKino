import { ApiPaginationResponse, PaginationParams } from "~/shared/types/api";

export interface FilmsRequest {
  type?: string;
}

export type FilmsResponse = ApiPaginationResponse<{
  films: Film[];
}>;
export interface FilmsAllRequest extends Partial<PaginationParams> {
  countries?: string;
  genres?: string;
  order?: string;
  type?: string;
}

export interface FilmsAllResponse {
  items: Film[];
  total: number;
  totalPages: number;
}

export interface FilmViewRequest {
  id: string;
}

export interface FilmViewResponse extends Film {
  description: string;
  ratingAgeLimits: string;
  reviewsCount: number;
  shortDescription: string;
  slogan: string;
}

export interface Film {
  countries: FilmCountry[];
  filmId: number;
  filmLength: string;
  genres: FilmGenre[];
  imdbId: string;
  kinopoiskId: number;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  rating: string;
  ratingImdb: string;
  ratingKinopoisk: string;
  ratingVoteCount: string;
  year: string;
}

export interface FilmGenre {
  genre: string;
}

export interface FilmCountry {
  country: string;
}
