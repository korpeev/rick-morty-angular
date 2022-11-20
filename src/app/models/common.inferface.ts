export interface Response<T> {
  info: Pagination;
  results: T[];
}

export interface Pagination {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export type FilterFields = 'status' | 'gender';
