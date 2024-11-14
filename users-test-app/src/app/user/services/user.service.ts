import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private userHttpService: UserService) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.userHttpService.getUsers().pipe(
      tap(users => {
        if (users.length > 0) {
          console.log('Successfully got users:', users);
        }
      }),
      catchError(error => {
        console.error('Error getting users:', error);
        return of([]); // Return an empty array if error occurs
      })
    );
  }

  // Create a new user
  createUser(user: User): Observable<User | null> {
    return this.userHttpService.createUser(user).pipe(
      tap(createdUser => {
        if (createdUser) {
          console.log('User created successfully:', createdUser);
        }
      }),
      catchError(error => {
        console.error('Error creating user:', error);
        return of(null); // Return null if error occurs
      })
    );
  }

  // Delete user
  deleteUser(user: User): Observable<any> {
    return this.userHttpService.deleteUser(user).pipe(
      tap(response => {
        if (response) {
          console.log('User deleted successfully:', response);
        }
      }),
      catchError(error => {
        console.error('Error deleting user:', error);
        return of(null);
      })
    );
  }
}
