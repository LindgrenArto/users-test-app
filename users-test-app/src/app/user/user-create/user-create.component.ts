import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../services/user-state.service'; // Assuming you are using this service
import { User } from '../models/user';
import { GeolocationService } from '../services/geolocation.service';
import { ToolbarService } from '../ui/toolbar/toolbar-service';
import { ToolbarOptions } from '../ui/toolbar/toolbar-options';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class UserCreateComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    userName: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  }

  constructor(
    private userStateService: UserStateService,
    private router: Router,
    private geolocationService: GeolocationService,
    private toolbar: ToolbarService
  ) { }


  ngOnInit(): void {

    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Create User', []));
  }


  // Function to handle form submission
  onSubmit() {
    // Mock geolocation
    this.mockGeolocation();

    //If the location would really be in use
    //this.getGeolocation(this.user.address.city, this.user.address.street);

    // Add the user to the state
    this.userStateService.addUser(this.user);

    // Navigate back to the user list
    this.router.navigate(['/user-list']);
  }

  // Mock geolocation function
  mockGeolocation() {
    this.user.address.geo.lat = "40.7128"; // Mocked latitude (e.g., New York City)
    this.user.address.geo.lng = "-74.0060"; // Mocked longitude (e.g., New York City)
  }

  // Function to get geolocation based on city and street
  async getGeolocation(city: string, street: string): Promise<void> {
    const address = `${street}, ${city}`;
    try {
      const response = await this.geolocationService.getGeolocation(address).toPromise();
      // Check if the response is valid and contains results
      if (response.results.length > 0) {
        const location = response.results[0].geometry.location;
        this.user.address.geo.lat = location.lat;
        this.user.address.geo.lng = location.lng;
      } else {
        console.error('Geocoding failed or no results found');
        // Set default lat/lng if not found
        this.user.address.geo.lat = "0";
        this.user.address.geo.lng = "0";
      }
    } catch (error) {
      console.error('Error fetching geolocation', error);
      // Set default coordinates in case of error
      this.user.address.geo.lat = "0";
      this.user.address.geo.lng = "0";
    }
  }
}
