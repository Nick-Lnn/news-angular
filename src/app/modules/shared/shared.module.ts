import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormComponent } from './shared-form/shared-form.component';
import { SharedButtonComponent } from './shared-button/shared-button.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SharedFormComponent,
    SharedButtonComponent
  ],
  exports: [
    SharedFormComponent,
    SharedButtonComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
