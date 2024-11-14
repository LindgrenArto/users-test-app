import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

//Mock service to show how the lat and lng could be populated
export class GeolocationService {
    private apiKey = "MOCK_API_KEY"
    private geocodingUrl = 'https://api.opencagedata.com/geocode/v1/json';

    constructor(private http: HttpClient) { }

    // Function to get latitude and longitude based on an address (city, street)
    getGeolocation(address: string): Observable<any> {
        const url = `${this.geocodingUrl}?q=${encodeURIComponent(address)}&key=${this.apiKey}&language=en&pretty=1`;
        return this.http.get(url);
    }
}
