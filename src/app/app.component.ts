import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as UserActions from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._store.dispatch(UserActions.checkAuth());
  }
}
