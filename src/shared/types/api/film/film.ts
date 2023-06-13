import {
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
