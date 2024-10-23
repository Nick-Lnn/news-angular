import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../../../../store/models/user.model';
import { NewsService } from '../../../../services/news.service';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {
  public postForm: FormGroup;
  public user$: Observable<User | null>;
  private selectedFiles: string[] = [];

  private readonly _avatarImages: string[] = [
    'man.png', 'man2.png', 'woman.png', 'woman2.png', 'animal.png'
  ];
  private readonly _selectedAvatarImage: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _newsService: NewsService
  ) {
    this.postForm = this._formBuilder.group({
      content: ['', Validators.required]
    });
    this.user$ = this._store.select(state => state.user.user);
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

  public onFileAttach(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files).map(file => file.name);
    }
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      this.user$.subscribe(user => {
        if (user) {
          const bulletinData = {
            content: this.postForm.get('content')?.value,
            fileIds: this.selectedFiles
          };
          this._newsService.createBulletin(bulletinData, user.accountId).subscribe(
            response => {
              console.log('Bulletin created:', response);
              this.postForm.reset();
              this.selectedFiles = [];
            },
            error => {
              console.error('Error creating bulletin:', error);
            }
          );
        }
      });
    }
  }
}
