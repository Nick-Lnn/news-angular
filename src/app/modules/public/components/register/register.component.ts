import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as UserActions from '../../../../store/actions/user.actions';
import * as UserSelectors from '../../../../store/selectors/user.selectors';
import { AppState } from '../../../../store/app.state';
import { Router } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;

  private _subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _router: Router,
    private _actions$: Actions
  ) {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    }, { validator: this._passwordMatchValidator });

    this.isLoading$ = this._store.select(UserSelectors.selectIsLoading);
    this.error$ = this._store.select(UserSelectors.selectError);
  }

  ngOnInit(): void {
    this._initialize();
    this._listenToRegisterSuccess();
  }

  ngOnDestroy(): void {
    this._finalize();
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, firstName, lastName, password } = this.registerForm.value;
      this._store.dispatch(UserActions.registerUser({ username, firstName, lastName, password }));
    }
  }

  public redirectToLogIn(): void {
    this._router.navigate(['/public/login'])
      .then(() => {})
      .catch(() => {});
  }

  private _initialize(): void {
  }

  private _finalize(): void {
    this._subscription.unsubscribe();
  }

  private _passwordMatchValidator(form: FormGroup): { mismatch: boolean } | null {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? { mismatch: true } : null;
  }

  private _listenToRegisterSuccess(): void {
    this._subscription.add(
      this._actions$.pipe(
        ofType(UserActions.registerUserSuccess)
      ).subscribe(() => {
        this._router.navigate(['/public/login']);
      })
    );
  }
}
