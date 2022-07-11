import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

    private apiEndpoint = environment.apiEndpoint;

    constructor(
        private http: HttpClient,
    ) { }

    public getSeries(): Observable<Array<any>> {
        return this.http.get<Array<any>>(
            this.apiEndpoint + `getSeries`
        );
    }
}
