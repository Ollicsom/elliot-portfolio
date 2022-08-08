import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serie } from './shared/models/serie.model';

@Injectable()
export class ApiService {

    private apiEndpoint = environment.apiEndpoint;

    constructor(
        private http: HttpClient,
    ) { }

    public getSeries(languageISO: string): Observable<Array<Serie>> {
        return this.http.get<Array<any>>(
            this.apiEndpoint + `getSeries/${languageISO}`
        );
    }

    public getSerie(serieId: number, languageISO: string): Observable<Serie> {
        return this.http.get<Serie>(
            this.apiEndpoint + `getSerie/${serieId}/${languageISO}`
        );
    }
}
