import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarRoutingModule } from './snack-bar-routing.module';
import { SnackBarComponent } from './snack-bar.component';
import { MaterialModule } from 'src/app/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    CommonModule,
    SnackBarRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class SnackBarModule { }
