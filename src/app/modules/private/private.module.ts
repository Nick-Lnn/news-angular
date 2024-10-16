import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './view/main-view/main-view.component';
import {PrivateRoutesModule} from "./routes/private-routes.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    MainViewComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutesModule,
    SharedModule
  ]
})
export class PrivateModule { }
