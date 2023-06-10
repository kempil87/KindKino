export interface FilmsRequest {
  type: string;
}

export interface FilmsResponse {
  films: Film[];
}

export interface Film {
  name: string;
}
