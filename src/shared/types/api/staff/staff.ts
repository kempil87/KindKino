import { FilmStaff, Staff } from '~/shared/types/staff/staff';

export interface ApiFilmStaff {
  res: Promise<FilmStaff[]>;
}
export interface ApiStaff {
  res: Promise<Staff>;
}
