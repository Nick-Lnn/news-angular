import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from "../../../../store/models/user.model";
import { AppState } from '../../../../store/app.state';
import * as fromUser from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {
  public user$: Observable<User | null>;

  private readonly _avatarImages: string[] = [
    'man.png', 'man2.png', 'woman.png', 'woman2.png', 'animal.png'
  ];
  private readonly _selectedAvatarImage: string;

  constructor(private _store: Store<AppState>) {
    this.user$ = this._store.select(fromUser.selectUser);
    this._selectedAvatarImage = this._getRandomAvatarImage();
  }

  ngOnInit(): void {
  }

  public getAvatarUrl(): string {
    return `assets/images/${this._selectedAvatarImage}`;
  }

  private _getRandomAvatarImage(): string {
    const randomIndex = Math.floor(Math.random() * this._avatarImages.length);
    return this._avatarImages[randomIndex];
  }
}
