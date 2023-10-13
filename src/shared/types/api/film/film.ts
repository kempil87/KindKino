import {
  FilmFactsResponse,
  FilmsAllRequest,
  FilmsAllResponse,
  FilmsRequest,
  FilmsResponse,
  FilmViewRequest,
  FilmViewResponse,
} from '~/shared/types/film/film';

export interface ApiFilms {
  req: FilmsRequest;
  res: Promise<FilmsResponse>;
}

export interface ApiFilmsAll {
  req: FilmsAllRequest;
  res: Promise<FilmsAllResponse>;
}

export interface ApiFilmView {
  req: FilmViewRequest;
  res: Promise<FilmViewResponse>;
}

export interface ApiFilmSimilary {
  req: FilmViewRequest;
  res: Promise<FilmsAllResponse>;
}

export interface ApiFilmSSequels {
  req: FilmViewRequest;
  res: Promise<FilmsAllResponse['items']>;
}

export interface ApiFilmFacts {
  req: FilmViewRequest;
  res: Promise<FilmFactsResponse>;
}
