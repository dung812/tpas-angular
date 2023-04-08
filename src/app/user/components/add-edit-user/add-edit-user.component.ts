import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userId: string | null = null;
  isAddMode: boolean | null = null;
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this._activatedRoute.snapshot.params['id'];
    this.isAddMode =  this.userId ? false : true;
    console.log(this.userId);
    console.log(this.isAddMode ? "add" : "edit");
  }

}
