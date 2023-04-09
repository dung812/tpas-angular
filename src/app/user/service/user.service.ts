import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IUserForm, IUserView } from '../model/user.';
import { apiUrl } from 'src/app/constants/myConstant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _usersMap!: Map<string, IUserView>;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private _http : HttpClient) { }

  getUsers(): Observable<IUserView[]> {
    return this._http.get<IUserView[]>(`${apiUrl}/Users` ).pipe(
      map((users) => {
        this._usersMap = new Map<string, IUserView>();
        users.forEach((user) => {
          this._usersMap.set(user.id, user);
        });
        return users;
      }),
    );
  }

  getUserById(userId: string | null) {
    if (!userId) return undefined;
    return this._usersMap ? this._usersMap.get(userId) : undefined;
  }
  createUser(user: IUserForm): Observable<IUserForm> {
    return this._http.post<IUserForm>(`${apiUrl}/Users`, user, this.httpOptions);
  }

  updateUser(id: string ,user: IUserForm): Observable<IUserForm> {
    return this._http.put<IUserForm>(`${apiUrl}/Users/${id}`, user, this.httpOptions);
  }

  deleteUser(id: string): any {
    return this._http.delete(`${apiUrl}/Users/${id}`);
  }
}
