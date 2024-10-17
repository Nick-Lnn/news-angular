import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from "../../../store/models/user.model";
import { AppState } from '../../../store/app.state';
import * as fromUser from '../../../store/selectors/user.selectors';
import * as UserActions from '../../../store/actions/user.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class SharedHeaderComponent implements OnInit, OnDestroy {
  public user$: Observable<User | null>;
  public isDropdownOpen: boolean = false;

  private readonly _avatarImages: string[] = [
    'man.png', 'man2.png', 'woman.png', 'woman2.png', 'animal.png'
  ];
  private readonly _selectedAvatarImage: string;

  private _userSubscription: Subscription = new Subscription();

  constructor(
    private _store: Store<AppState>,
    private _router: Router
  ) {
    this.user$ = this._store.select(fromUser.selectUser).pipe(
      tap(user => console.log('User in shared header:', user))
    );
    this._selectedAvatarImage = this._getRandomAvatarImage();
  }

  ngOnInit(): void {
    this._initialize();
  }

  ngOnDestroy(): void {
    this._finalize();
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public getAvatarUrl(): string {
    return `assets/images/${this._selectedAvatarImage}`;
  }

  public onLogout(): void {
    // Clear the token from localStorage
    localStorage.removeItem('auth_token');

    // Dispatch the logout action
    this._store.dispatch(UserActions.logoutUser());

    // Close the dropdown
    this.isDropdownOpen = false;

    // Navigate to the login page
    this._router.navigate(['/public/login']);
  }

  private _initialize(): void {
    this._userSubscription = this.user$.subscribe();
  }

  private _finalize(): void {
    if (this._userSubscription) {
      this._userSubscription.unsubscribe();
    }
  }

  private _getRandomAvatarImage(): string {
    const randomIndex = Math.floor(Math.random() * this._avatarImages.length);
    return this._avatarImages[randomIndex];
  }
}
