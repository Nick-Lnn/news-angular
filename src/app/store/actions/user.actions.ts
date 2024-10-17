import { createAction, props } from '@ngrx/store';

export const registerUser = createAction(
  '[User] Register User',
  props<{ username: string; firstName: string; lastName: string; password: string }>()
);

export const registerUserSuccess = createAction(
  '[User] Register User Success',
  props<{ user: any }>()
);

export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{ error: string }>()
);

export const loginUser = createAction(
  '[User] Login User',
  props<{ username: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ token: string }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: string }>()
);

export const fetchUserProfile = createAction('[User] Fetch User Profile');

export const fetchUserProfileSuccess = createAction(
  '[User] Fetch User Profile Success',
  props<{ user: any }>()
);

export const fetchUserProfileFailure = createAction(
  '[User] Fetch User Profile Failure',
  props<{ error: string }>()
);

export const checkAuth = createAction('[User] Check Auth');

export const setToken = createAction(
  '[User] Set Token',
  props<{ token: string }>()
);

export const authCheckComplete = createAction('[User] Auth Check Complete');
