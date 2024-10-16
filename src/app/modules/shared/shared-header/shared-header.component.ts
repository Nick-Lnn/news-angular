import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from "../../../store/models/user.model";
import { AppState } from '../../../store/app.state';
import * as fromUser from '../../../store/selectors/user.selectors';
import { tap } from 'rxjs/operators';

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

  constructor(private _store: Store<AppState>) {
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

  // Uncomment and implement this method when you're ready to add logout functionality
  // public onLogout(): void {
  //   // Implement logout logic here
  // }

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
