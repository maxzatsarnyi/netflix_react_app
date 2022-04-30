export type Movie = {
  id: string;
  poster_path: string;
  name: string;
  backdrop_path: string;
  title: string;
  original_name: string;
  overview: string;
};

export type GetMovieResponse<T> = {
  results: T[];
};
