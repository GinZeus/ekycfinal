export interface IUser {
  id: string;
  address: string;
  email: string;
  comboName: string;
  idCard: string;
  phoneNumber: string;
}

export interface Link {
  '@href': string;
  '@rel': string;
}

export interface Category {
  '@id': number;
  '@REL_ATTR': string;
  '@COMMON_NAME': string;
  link: Link;
}

export interface Status {
  '@id': number;
  '@REL_ATTR': string;
  '@COMMON_NAME': string;
  link: Link;
}

export interface Cnt {
  '@id': string;
  '@REL_ATTR': string;
  '@COMMON_NAME': number;
  link: Link;
  category: Category;
  zapprover: Category;
  open_date: number;
  status: Status;
  zcfg_requester_address: string;
  zcfg_requester_address_email: string;
  zfullname: string;
  zcfg_requester_card_number: string;
  zcfg_requester_id_passport: string;
  zcfg_requester_organization: string;
  zcfg_requester_phone_number: string;
  zcfg_requester_postion: string;
}

export interface CollectionCnt {
  '@COUNT': number;
  '@START': number;
  '@TOTAL_COUNT': number;
  cnt: Cnt;
}

export interface IUserResponse {
  collection_cnt: CollectionCnt;
}
