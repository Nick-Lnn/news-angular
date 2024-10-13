import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { selectToken } from '../reducers/user.reducer';
import {AppState} from "../app.state";

@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.registerUser),
      switchMap(action =>
        this._userService.registerUser(action).pipe(
          map(user => UserActions.registerUserSuccess({ user })),
          catchError(error => of(UserActions.registerUserFailure({ error: error.message })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loginUser),
      switchMap(({ username, password }) =>
        this._userService.loginUser({ username, password }).pipe(
          map(response => UserActions.loginUserSuccess({ token: response.token })),
          catchError(error => of(UserActions.loginUserFailure({ error: error.message })))
        )
      )
    )
  );

  fetchUserProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.fetchUserProfile),
      withLatestFrom(this._store.select(selectToken)),
      mergeMap(([_, token]) => {
        if (!token) {
          return of(UserActions.fetchUserProfileFailure({ error: 'No token available' }));
        }
        return this._userService.fetchUserProfile(token).pipe(
          map(user => UserActions.fetchUserProfileSuccess({ user })),
          catchError(error => of(UserActions.fetchUserProfileFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _userService: UserService,
    private _store: Store<AppState>
  ) {}
}
