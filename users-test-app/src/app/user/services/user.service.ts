import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private userHttpService: UserService) { }

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.userHttpService.getUsers();
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.userHttpService.createUser(user);
  }

  // Delete a user
  deleteUser(user: User): Observable<any> {
    return this.userHttpService.deleteUser(user);
  }
}
