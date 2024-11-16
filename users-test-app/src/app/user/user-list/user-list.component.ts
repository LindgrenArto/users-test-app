import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { UserStateService } from '../services/user-state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarService } from '../ui/toolbar/toolbar-service';
import { ToolbarOptions } from '../ui/toolbar/toolbar-options';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatFormField,
    FilterPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  selectedUsers: User[] = [];
  private userSubscription: Subscription | undefined;
  dataSource = new MatTableDataSource<User>();
  searchTerm: string = '';
  displayedColumns: string[] = ['select', 'name', 'email', 'phone'];

  selectedUserIds: Set<number> = new Set();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private userStateService: UserStateService,
    private toolbar: ToolbarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.getUsers(); Commented out for the mock deleting to work

    this.userStateService.users$.subscribe(users => {
      this.users = users;

      this.dataSource.data = this.users;
    });

    this.toolbar.setToolbarOptions(new ToolbarOptions(false, 'User Control Panel', []));
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  /*
  // Bulk delete users, if it were real
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

  // Delete user, if it were real
  
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
    */


  onSelectUser(user: User): void {
    if (this.selectedUserIds.has(user.id)) {
      this.selectedUserIds.delete(user.id);
    } else {
      this.selectedUserIds.add(user.id);
    }

    this.updateTableSelections();

  }

  isSelected(user: User): boolean {
    return this.selectedUserIds.has(user.id);
  }

  onSelectAll(checked: boolean): void {
    const pageUsers = this.dataSource.filteredData.slice(
      this.paginator?.pageIndex * this.paginator?.pageSize || 0,
      (this.paginator?.pageIndex + 1) * this.paginator?.pageSize || this.dataSource.filteredData.length
    );

    if (checked) {
      pageUsers.forEach(user => this.selectedUserIds.add(user.id));
    } else {
      pageUsers.forEach(user => this.selectedUserIds.delete(user.id));
    }


    this.updateTableSelections();
  }

  updateTableSelections(): void {
    // Update the table visual state
    this.dataSource.data = [...this.dataSource.data];
  }

  onBulkDelete(): void {
    const count = this.selectedUserIds.size;

    this.users = this.users.filter(user => !this.selectedUserIds.has(user.id));
    this.selectedUserIds.clear();

    // Refresh the table data
    this.dataSource.data = this.users;
    console.log('Bulk delete completed');

    // Show snackbar notification
    this.snackBar.open(`${count} user(s) deleted successfully.`, 'OK!', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }


  onAddUser() {
    this.router.navigate(['/user-create']);
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
