import {createReducer, on} from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import {User} from "../models/user.model";

export interface UserState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  token: null,
  error: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.registerUser, state => ({ ...state, loading: true })),
  on(UserActions.registerUserSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(UserActions.registerUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(UserActions.loginUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loginUserSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
    error: null
  })),
  on(UserActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.fetchUserProfile, state => ({ ...state, loading: true })),
  on(UserActions.fetchUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(UserActions.fetchUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
