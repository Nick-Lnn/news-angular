import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './view/main-view/main-view.component';
import {PrivateRoutesModule} from "./routes/private-routes.module";



@NgModule({
  declarations: [
    MainViewComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutesModule,
  ]
})
export class PrivateModule { }
