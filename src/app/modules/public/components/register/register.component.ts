import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as UserActions from '../../../../store/actions/user.actions';
import { UserState } from '../../../../store/reducers/user.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public isLoading: boolean = false;

  private _subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<UserState>
  ) {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    }, { validator: this._passwordMatchValidator });
  }

  ngOnInit(): void {
    this._initialize();

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

  private _initialize(): void {
    this._subscription.add(
      this._store.select(state => state.user).subscribe(userState => {
        this.isLoading = userState.loading;
      })
    );
  }

  private _finalize(): void {
    this._subscription.unsubscribe();
  }

  private _passwordMatchValidator(form: FormGroup): { mismatch: boolean } | null {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? { mismatch: true } : null;
  }
}
