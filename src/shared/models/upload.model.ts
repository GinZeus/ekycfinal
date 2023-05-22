export interface Link {
  '@href': string;
  '@rel': string;
}

export interface Attmnt {
  '@id': string;
  '@REL_ATTR': number;
  '@COMMON_NAME': number;
  link: Link;
}

export interface IUploadResponse {
  attmnt: Attmnt;
}
