export interface ApiFilter {
  res: Promise<FilterProps>;
}

export interface FilterProps {
  countries: FilterCountry[];
  genres: FilterGenre[];
}

export interface FilterCountry {
  country: string;
  id: number;
}

export interface FilterGenre {
  genre: string;
  id: number;
}
