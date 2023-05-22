import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ILoginObj } from '../../../shared/models/login.model';
import { IInitialState } from '../../../shared/utils/shared-interfaces';

import { login } from './auth.api';

interface ILoginInitialState extends IInitialState {
  token: string | null;
  fetchLoginSuccess: boolean;
}

const initialState: ILoginInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  fetchLoginSuccess: false,
  token: null,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

const { actions, reducer } = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    resetAll(state) {
      state.fetchLoginSuccess = false;
      state.token = null;
      state.loading = false;
      state.fetchEntitiesSuccess = false;
      state.fetchEntitySuccess = false;
      state.updateEntitySuccess = false;
      state.deleteEntitySuccess = false;
      state.errorMessage = null;
    },
    resetEntity(state) {
      state.fetchLoginSuccess = false;
      state.updateEntitySuccess = false;
      state.errorMessage = null;
      state.deleteEntitySuccess = false;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }: PayloadAction<AxiosResponse<ILoginObj>>) => {
      localStorage.setItem('access_key', payload.data.rest_access.access_key);
      state.token = payload.data.rest_access.access_key;
      state.fetchLoginSuccess = true;
      state.loading = false;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      localStorage.removeItem('access_key');
      state.errorMessage = payload;
      state.loading = false;
      state.fetchLoginSuccess = false;
    },
  },
});

export const { fetching, resetAll, resetEntity } = actions;
export default reducer;
