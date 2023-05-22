export interface IInitialState {
  fetchEntitiesSuccess: boolean;
  fetchEntitySuccess: boolean;
  updateEntitySuccess: boolean;
  deleteEntitySuccess: boolean;
  loading: boolean;
  errorMessage: string | null;
  totalItems: number;
}

export interface IParams {
  size: number;
  page: number;
  sort?: string;
}

export interface IResponse<T> {
  count: number;
  results: T;
}

export interface ICusSelectOptions {
  label?: string;
  value?: number | string;
  id?: number;
  name?: string;
}

export interface IWindowEth extends Window {
  ethereum: any;
}