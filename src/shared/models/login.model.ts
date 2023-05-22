export interface Link {
  '@href': string;
  '@rel': string;
}

export interface RestAccess {
  '@id': number;
  '@REL_ATTR': number;
  '@COMMON_NAME': number;
  link: Link;
  access_key: string;
  expiration_date: number;
}

export interface ILoginObj {
  rest_access: RestAccess;
}
