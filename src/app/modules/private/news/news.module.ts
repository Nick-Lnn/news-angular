import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsViewComponent} from "./view/news-view.component";
import {NewsRoutingModule} from "./routes/news-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [NewsViewComponent],
  exports: [
    NewsViewComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ReactiveFormsModule
  ]
})
export class NewsModule { }
