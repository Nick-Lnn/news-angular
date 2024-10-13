import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as UserActions from '../../../../store/actions/user.actions';
import * as fromUser from '../../../../store/reducers/user.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;

  private readonly _FORM_CONTROLS = {
    USERNAME: 'username',
    PASSWORD: 'password'
  };

  private _userSubscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromUser.UserState>,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      [this._FORM_CONTROLS.USERNAME]: ['', [Validators.required]],
      [this._FORM_CONTROLS.PASSWORD]: ['', [Validators.required]]
    });
    this.isLoading$ = this._store.select(fromUser.selectIsLoading);
    this.error$ = this._store.select(fromUser.selectError);
  }

  ngOnInit(): void {
    this._initialize();
  }

  ngOnDestroy(): void {
    this._finalize();
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this._store.dispatch(UserActions.loginUser({ username, password }));

      // Check for successful login and redirect after a short delay
      setTimeout(() => {
        this._checkLoginStatusAndRedirect();
      }, 500);
    }
  }

  private _initialize(): void {
    // No need to subscribe here as we'll check after login attempt
  }

  private _checkLoginStatusAndRedirect(): void {
    this._userSubscription.add(
      this._store.select(fromUser.selectUser)
        .pipe(take(1))
        .subscribe(user => {
          console.log('User state:', user);
          if (user && user.token) {
            console.log('User logged in, redirecting...');
            this._store.dispatch(UserActions.fetchUserProfile());
            this._router.navigate(['/private/news']).then(() => {
              console.log('Navigation complete');
            }).catch(error => {
              console.error('Navigation failed:', error);
            });
          } else {
            console.log('User not logged in or token missing');
          }
        })
    );
  }

  private _finalize(): void {
    if (this._userSubscription) {
      this._userSubscription.unsubscribe();
    }
  }
}
