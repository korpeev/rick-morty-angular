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
export interface Params {
  page?: number;
  name?: string;
}
export type FilterTypes = {
  gender: 'Female' | 'Male' | 'All';
  status: 'Alive' | 'Dead' | 'unknown' | 'All';
};
