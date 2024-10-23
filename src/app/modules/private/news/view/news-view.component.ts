import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Observable } from 'rxjs';
import { User } from '../../../../store/models/user.model';
import {BulletinData, NewsService} from '../../../../services/news.service';
import {Bulletin} from "../../../../store/models/bulletin.model";

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {
  public postForm: FormGroup;
  public user$: Observable<User | null>;
  private selectedFiles: string[] = [];
  public bulletins: Bulletin[] = []; // To store the list of bulletins

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
    this.loadBulletins();
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
          const bulletinData: BulletinData = {
            content: this.postForm.get('content')?.value,
            fileIds: this.selectedFiles,
            senderUsername: user.username
          };

          console.log('Sending bulletin data:', bulletinData);

          this._newsService.createBulletin(bulletinData, user.accountId, user.id).subscribe(
            response => {
              console.log('Bulletin created:', response);
              this.postForm.reset();
              this.selectedFiles = [];
              this.loadBulletins(); // Refresh the bulletins list
            },
            error => {
              console.error('Error creating bulletin:', error);
              // Handle error (e.g., show an error message to the user)
            }
          );
        }
      });
    }
  }

  private loadBulletins(): void {
    this._newsService.listBulletins().subscribe(
      (response: any) => {
        this.bulletins = response.content.map((bulletin: any) => ({
          ...bulletin,
          avatar: this._getRandomAvatarImage(),
          createdDate: new Date(bulletin.createdDate).toLocaleString(),
          senderUsername: bulletin.senderUsername || 'Unknown User' // Ensure this property exists
        }));
        console.log('Loaded bulletins:', this.bulletins); // Add this line for debugging
      },
      error => {
        console.error('Error loading bulletins:', error);
      }
    );
  }

  public onReply(bulletinId: number): void {
    // Implement reply functionality here
    console.log('Reply to bulletin:', bulletinId);
  }
}
