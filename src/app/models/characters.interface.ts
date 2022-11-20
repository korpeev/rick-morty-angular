export type RecordInfo = {
  name: string;
  url: string;
};

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: '';
  gender: string;
  origin: RecordInfo;
  location: RecordInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
