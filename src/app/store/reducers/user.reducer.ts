import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: any;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  error: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.registerUser, state => ({ ...state, loading: true })),
  on(UserActions.registerUserSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(UserActions.registerUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
