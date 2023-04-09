import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './service/user.service';
import { IUserView } from './model/user.';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public headers  = ["name", "role", "email", "grade", "dc", "position"];

  users: IUserView[] = [];
  dataSource = new MatTableDataSource<IUserView>();
  displayedColumns = ["name", "role", "email", "grade", "dc", "position", 'action'];


  constructor(private _userService: UserService) {}

  ngOnInit() {
    console.log('load user');
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
