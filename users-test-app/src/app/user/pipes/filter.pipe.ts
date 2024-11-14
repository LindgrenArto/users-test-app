import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';


@Pipe({
    name: 'filter',
    pure: false,
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(users: User[], searchTerm: string): User[] {
        if (!searchTerm) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}
