
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { Component } from '@angular/core';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, UserDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users-test-app';
}
