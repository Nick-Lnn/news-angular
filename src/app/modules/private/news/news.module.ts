import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsViewComponent} from "./view/news-view.component";
import {NewsRoutingModule} from "./routes/news-routing.module";



@NgModule({
  declarations: [NewsViewComponent],
  exports: [
    NewsViewComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
