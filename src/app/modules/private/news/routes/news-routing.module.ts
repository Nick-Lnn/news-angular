import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsViewComponent} from "../view/news-view.component";

const routes : Routes = [
  {path:'', component: NewsViewComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
