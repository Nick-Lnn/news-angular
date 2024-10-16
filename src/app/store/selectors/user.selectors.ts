import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectToken = createSelector(
  selectUserState,
  (state: UserState) => state.token
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
