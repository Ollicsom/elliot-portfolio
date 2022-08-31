import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from './shared/models/language';
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

    public getAllSeriesData(): Observable<Array<Serie>> {
        return this.http.get<Array<any>>(
            this.apiEndpoint + `getAllSeriesData/`
        );
    }

    public getSerie(serieId: number, languageISO: string): Observable<Serie> {
        return this.http.get<Serie>(
            this.apiEndpoint + `getSerie/${serieId}/${languageISO}`
        );
    }

    public getLanguages(): Observable<Array<Language>> {
        return this.http.get<Array<Language>>(
            this.apiEndpoint + `getLanguages`
        );
    }

    public uploadImage(photoData: FormData): Observable<any> {
        return this.http.post<Array<Language>>(
            this.apiEndpoint + `uploadPhoto`,
            photoData
        );
    }

    public updateOrCreateSerie(serie: Serie): Observable<any> {
        return this.http.post<any>(
            this.apiEndpoint + `updateOrCreateSerie`,
            serie
        );
    }

    public login(userValue: {username: string, password: string}): Observable<any> {
        return this.http.post<any>(
            this.apiEndpoint + `login`,
            userValue
        );
    }
}
