import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormComponent } from './shared-form/shared-form.component';
import { SharedButtonComponent } from './shared-button/shared-button.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SharedHeaderComponent } from './shared-header/shared-header.component';



@NgModule({
  declarations: [
    SharedFormComponent,
    SharedButtonComponent,
    SharedHeaderComponent
  ],
  exports: [
    SharedFormComponent,
    SharedButtonComponent,
    ReactiveFormsModule,
    SharedHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
