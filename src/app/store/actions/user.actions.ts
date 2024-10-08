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
