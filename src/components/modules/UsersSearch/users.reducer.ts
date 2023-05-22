import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '../../../reducers';
import { IUser, IUserResponse } from '../../../shared/models/users.model';
import { IInitialState } from '../../../shared/utils/shared-interfaces';
import { getUserInfoFromResponse } from './helper';
import { attachImageToUser, getEntities, getEntity, getUser } from './users.api';

interface IUserInitialState extends IInitialState {
  user: IUser | null;
  fetchUserSuccess: boolean;
  attachImageToUserSuccess: boolean;
}

const initialState: IUserInitialState = {
  attachImageToUserSuccess: false,
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  fetchUserSuccess: false,
  user: null,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

export const usersAdapter = createEntityAdapter<IUser>({
  selectId: ({ id }) => id,
});

const { actions, reducer } = createSlice({
  name: 'userSlice',
  initialState: usersAdapter.getInitialState({ initialState }),
  reducers: {
    fetching(state) {
      state.initialState.loading = true;
    },
    resetAll(state) {
      state.initialState.attachImageToUserSuccess = false;
      state.initialState.fetchUserSuccess = false;
      state.initialState.user = null;
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.fetchEntitySuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.errorMessage = null;
    },
    resetEntity(state) {
      state.initialState.attachImageToUserSuccess = false;

      state.initialState.fetchUserSuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.errorMessage = null;
      state.initialState.deleteEntitySuccess = false;
    },
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<AxiosResponse<IUser[]>>) => {
      usersAdapter.setAll(state, payload.data);
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    },
    [getEntities.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
    },
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
      usersAdapter.upsertOne(state, payload);
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    // [getUser.fulfilled.type]: (state, { payload }: PayloadAction<AxiosResponse<IUser>>) => {
    //   state.initialState.user = payload.data;
    //   state.initialState.fetchUserSuccess = true;
    //   state.initialState.loading = false;
    // },
    [getUser.fulfilled.type]: (state, { payload }: PayloadAction<AxiosResponse<IUserResponse>>) => {
      state.initialState.user = getUserInfoFromResponse(payload.data);
      state.initialState.fetchUserSuccess = true;
      state.initialState.loading = false;
    },
    [getUser.rejected.type]: (state, { payload }: PayloadAction<any>) => {      
      state.initialState.errorMessage = payload;
      state.initialState.loading = false;
      state.initialState.fetchUserSuccess = false;
    },
    [attachImageToUser.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
      state.initialState.attachImageToUserSuccess = true;
      state.initialState.loading = false;
    },
    [attachImageToUser.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.attachImageToUserSuccess = false;
    },
    // [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
    //   usersAdapter.updateOne(state, { id: payload.id, changes: payload });
    //   state.initialState.updateEntitySuccess = true;
    //   state.initialState.loading = false;
    // },
    // [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
    //   state.initialState.errorMessage = payload?.message;
    //   state.initialState.loading = false;
    //   state.initialState.updateEntitySuccess = false;
    // },
    // [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
    //   usersAdapter.addOne(state, payload);
    //   state.initialState.updateEntitySuccess = true;
    //   state.initialState.loading = false;
    // },
    // [createEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
    //   state.initialState.errorMessage = payload?.message;
    //   state.initialState.loading = false;
    //   state.initialState.updateEntitySuccess = false;
    // },
    // [removeEntity.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
    //   usersAdapter.removeOne(state, payload);
    //   state.initialState.totalItems -= 1;
    //   state.initialState.deleteEntitySuccess = true;
    //   state.initialState.loading = false;
    // },
    // [removeEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
    //   state.initialState.errorMessage = payload?.message;
    //   state.initialState.loading = false;
    //   state.initialState.deleteEntitySuccess = false;
    // },
  },
});

export const { fetching, resetAll, resetEntity } = actions;
export default reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.user);

const { selectById } = usersAdapter.getSelectors();
const getUserState = (rootState: RootState) => rootState.user;

export const selectEntityById = (id: string) => {
  return createSelector(getUserState, (state) => selectById(state, id));
};
