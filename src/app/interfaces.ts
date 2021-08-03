export interface IFilm {
  id: string;
  name: string;
  genres: string[];
  year: number;
}

export interface IFilmsResponce {
  total: number;
  data: IFilm[];
}
