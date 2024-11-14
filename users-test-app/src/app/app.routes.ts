import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';

export const routes: Routes = [
    { path: 'user-list', component: UserListComponent },
    { path: 'user-details/:id', component: UserDetailComponent },
    { path: 'user-create', component: UserCreateComponent },
    { path: '', redirectTo: 'user-list', pathMatch: 'full' }
];
