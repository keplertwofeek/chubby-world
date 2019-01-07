import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class WeightDataService {

	constructor(private http: HttpClient) { }

	getData(): any {
		return this.http.get('https://api.chubbyboys.club/v1/weighins')
		.pipe(result => result);
}


}
