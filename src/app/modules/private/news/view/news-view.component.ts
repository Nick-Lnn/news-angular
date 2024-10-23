import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../../../../store/models/user.model';
import { BulletinData, NewsService } from '../../../../services/news.service';
import { Bulletin } from "../../../../store/models/bulletin.model";

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {
  public postForm: FormGroup;
  public user$: Observable<User | null>;
  private _selectedFiles: string[] = [];
  public bulletins: Bulletin[] = [];

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
    this._loadBulletins();
  }

  public getAvatarUrl(): string {
    return `assets/images/${this._selectedAvatarImage}`;
  }

  public getFileIcon(fileId: string): string {
    const extension = fileId.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'assets/svg/pdf-file.svg';
      case 'jpg':
      case 'jpeg':
        return 'assets/svg/jpg-file.svg';
      case 'png':
        return 'assets/svg/png-file.svg';
      default:
        return 'assets/svg/document.svg';
    }
  }

  public getFileName(fileId: string): string {
    return fileId.split('/').pop() || fileId;
  }

  public onFileAttach(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this._selectedFiles = Array.from(input.files).map(file => file.name);
    }
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      this.user$.subscribe(user => {
        if (user) {
          const bulletinData: BulletinData = {
            content: this.postForm.get('content')?.value,
            fileIds: this._selectedFiles,
            senderUsername: user.username
          };

          this._newsService.createBulletin(bulletinData, user.accountId, user.id).subscribe(
            () => {
              this.postForm.reset();
              this._selectedFiles = [];
              this._loadBulletins();
            },
            error => {
            }
          );
        }
      });
    }
  }

  public onReply(bulletinId: number): void {
  }

  private _getRandomAvatarImage(): string {
    const randomIndex = Math.floor(Math.random() * this._avatarImages.length);
    return this._avatarImages[randomIndex];
  }

  private _loadBulletins(): void {
    this._newsService.listBulletins().subscribe(
      (response: any) => {
        this.bulletins = response.content.map((bulletin: any) => ({
          id: bulletin.id,
          senderUsername: bulletin.senderUsername || 'Unknown User',
          body: bulletin.body, // Change 'body' to 'content' if that's what the API returns
          createdDate: new Date(bulletin.createdDate).toLocaleString(),
          avatar: this._getRandomAvatarImage(),
          fileIds: bulletin.fileIds || [] // Ensure fileIds is always an array
        }));
      },
      error => {
      }
    );
  }
}
