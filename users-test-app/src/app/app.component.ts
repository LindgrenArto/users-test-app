
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { Component, OnInit } from '@angular/core';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserStateService } from './user/services/user-state.service';
import { UserService } from './user/services/user.service';
import { User } from './user/models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, UserDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// For mocking purposes
export class AppComponent implements OnInit {
  title = 'users-test-app';
  constructor(private userStateService: UserStateService,
    private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.userStateService.setUsers(users);
    });
  }
}

