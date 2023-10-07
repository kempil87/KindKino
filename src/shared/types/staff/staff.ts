import { Film } from '~/shared/types/film/film';

export interface FilmStaff {
  description: string;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  professionKey: string;
  professionText: string;
  staffId: number;
}

export interface Staff {
  age: number;
  birthday: string;
  birthplace: string;
  death: string;
  deathplace: string;
  facts: string[];
  films: Film[];
  growth: number;
  hasAwards: number;
  nameEn: string;
  nameRu: string;
  personId: number;
  posterUrl: string;
  profession: string;
  sex: string;
}
