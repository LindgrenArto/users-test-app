import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private userStateService: UserStateService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userSubscription = this.userStateService.users$.subscribe({
        next: (users: User[]) => {
          this.user = users.find(u => u.id === parseInt(userId, 10)) || null;
        },
        error: (err) => {
          console.error('Error fetching user details', err);
        },
        complete: () => {
          console.log('User fetch completed');
        }
      });
    }
  }

  onDeleteUser(): void {
    if (this.user) {
      this.userStateService.deleteUser(this.user.id);
      this.router.navigate(['']);
    }
  }

  goBack() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      console.log('Unsubscribed from user details observable');
    }
  }
}
