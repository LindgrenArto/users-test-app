import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  selectedUsers: User[] = [];
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  // Fetch users from the service
  getUsers() {
    this.userSubscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
      complete: () => {
        console.log('User fetch completed');
      }
    });
  }

  // Select a single user
  onSelectUser(user: User) {
    const index = this.selectedUsers.indexOf(user);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  // Check if user is selected
  isSelected(user: User): boolean {
    return this.selectedUsers.includes(user);
  }

  // Select all users
  onSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedUsers = [...this.users];
    } else {
      this.selectedUsers = [];
    }
  }

  // Bulk delete users
  onBulkDelete() {
    const selectedUserIds = this.selectedUsers.map(user => user.id); // Get an array of user IDs
    this.userService.bulkDeleteUsers(selectedUserIds).subscribe({
      next: () => {
        console.log('Users deleted successfully');
        // Remove deleted users from the list
        this.users = this.users.filter(user => !selectedUserIds.includes(user.id));
        this.selectedUsers = []; // Clear selection after deletion
      },
      error: (error) => {
        console.error('Error deleting users', error);
      }
    });
  }

  // Delete user
  onDeleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        console.log(`User ${user.name} deleted successfully`);
        this.users = this.users.filter((u) => u !== user); // Remove user from list
      },
      error: (error) => {
        console.error('Error deleting user', error);
      }
    });
  }

  // Navigate to user details
  onUserClick(user: User) {
    this.router.navigate([`/user-details/${user.id}`]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      console.log('Unsubscribed from user list observable');
    }
  }
}
