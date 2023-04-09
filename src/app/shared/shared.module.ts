import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [MaterialModule]
})
export class SharedModule { }
