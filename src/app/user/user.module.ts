import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UserService } from './service/user.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule, FormsModule, ReactiveFormsModule,
    SharedModule
  ],
  providers: [UserService,{ provide: 'FORM_BUILDER', useClass: FormBuilder }],
})
export class UserModule { }
