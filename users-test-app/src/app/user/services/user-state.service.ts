import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    // Update the list of users
    setUsers(users: User[]) {
        this.usersSubject.next(users);
    }

    // Delete a user from the list
    deleteUser(userId: number) {
        const updatedUsers = this.usersSubject.value.filter(user => user.id !== userId);
        this.setUsers(updatedUsers);
    }

    addUser(user: User): void {
        const currentUsers = this.usersSubject.value;

        // Add the new user to the list
        const updatedUsers = [...currentUsers, user];

        this.setUsers(updatedUsers);
    }
}
