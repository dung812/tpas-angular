import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { IUserForm, IUserView } from '../../model/user.';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  userId: string | null = null;
  isAddMode: boolean | null = null;
  user!: IUserView | string | any; // for update user
  userForm!: FormGroup;
  loading = false;

  errorMessage: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this._activatedRoute.snapshot.params['id'];
    this.isAddMode = this.userId ? false : true;
    if (!this.isAddMode) {
      this.user = this._userService.getUserById(this.userId) || '--';
    }
    this.initForm();
  }


  initForm() {
    this.userForm = this._formBuilder.group({
      name: [
        this.isAddMode ? '' : this.user.name,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.isAddMode ? '' : this.user.email,
        Validators.compose([Validators.required, this.noAtSymbolValidator]),
      ],
      position: [this.isAddMode ? '' : this.user.position, Validators.compose([Validators.required])],
      dc: [this.isAddMode ? '' : this.user.dc, Validators.compose([Validators.required])],
      grade: [this.isAddMode ? '' : this.user.grade, Validators.compose([Validators.required])],
      major: [this.isAddMode ? '' : this.user.major, Validators.compose([Validators.required])],
      role: [this.isAddMode ? '' : this.user.role, this.isAddMode && Validators.compose([Validators.required])],
    });
  }

  noAtSymbolValidator(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    if (email && email.includes('@')) {
      return { noAtSymbol: true };
    } else {
      return null;
    }
  }
  handleTyping() {
    this.errorMessage = '';
  }
  handleSubmit() {
    this.loading = true;

    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
        if (this.isAddMode) {
            const dataSubmit : IUserForm = {
                email: this.userForm.value.email + '@tma.com.vn',
                name: this.userForm.value.name,
                position: this.userForm.value.position,
                dc: this.userForm.value.dc,
                grade: Number(this.userForm.value.grade),
                major: this.userForm.value.major,
                role: this.userForm.value.role,
              };
              this._userService.createUser(dataSubmit).subscribe({
                next: (data) => {
                    this.toastr.success('Successfully!', 'Create User Successfully');
                    //navigate main
                    this.router.navigate(['/user']);
                },
                error: (error) => {
                    this.toastr.success('Error!', 'Create user faily');
                    if (error.error.status === 400) {
                        this.errorMessage = error.error.message;
                    }
                },
                complete:() => {
                    this.loading = false;
                }
              })
        }
        else {
            // case update
        }

    }
  }
}
