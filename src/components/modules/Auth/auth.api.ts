import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../shared/config/axios-interceptor';
import { AUTH_PASSWORD, AUTH_USERNAME } from '../../../shared/config/constants';
import { ILoginObj } from '../../../shared/models/login.model';

const prefix = 'rest_access';

export const login = createAsyncThunk(`get-all-${prefix}`, async (_, thunkAPI) => {
  try {
    const data = `<rest_access/>`;
    const headers = {
      Authorization: 'Basic YWRtaW5pc3RyYXRvcjpUaXZAMjAyMSM=',
      'Content-Type': 'application/xml',
    };
    const auth = {
      username: AUTH_USERNAME,
      password: AUTH_PASSWORD,
    };
    const loginResponse = await axios.post<ILoginObj>(`${prefix}`, `${data}`, { headers, auth });
    return loginResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
