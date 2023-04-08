import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';


@NgModule({
  declarations: [
    UserComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
