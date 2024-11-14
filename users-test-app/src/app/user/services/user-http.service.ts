import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  // Mock function for creating a user
  createUser(user: User): Observable<User | null> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      // Handling success
      catchError(error => {
        console.error('Error creating user:', error);
        return of(null);
      }),
      tap((createdUser) => {
        if (createdUser) {
          console.log('User created successfully:', createdUser);
        }
      })
    );
  }

  // Mock function for deleting a user
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      tap(() => {
        console.log(`User with ID ${userId} deleted successfully.`);
      }),
      catchError(error => {
        console.error('Error deleting user:', error);
        return of();
      })
    );
  }

  // Bulk delete users by a list of IDs
  bulkDeleteUsers(userIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/multiple`;
    return this.http.post<any>(url, { ids: userIds }).pipe(
      tap(() => {
        console.log(`Users  ${userIds} deleted successfully.`);
      }),
      catchError(error => {
        console.error('Error deleting users:', error);
        return of();
      })
    );
  }
}
