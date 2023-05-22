import { combineReducers } from 'redux';
import container from './components/containers/reducer';
import login from './components/modules/Auth/auth.reducer';
import user from './components/modules/UsersSearch/users.reducer';

const rootReducer = combineReducers({ container, user, login });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
