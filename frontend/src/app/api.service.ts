import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        return this.http.get<Array<Serie>>(
            this.apiEndpoint + `getSeries/${languageISO}`
        );
    }

    public getAllSeriesData(): Observable<Array<Serie>> {
        return this.http.get<Array<Serie>>(
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
        return this.http.post<any>(
            this.apiEndpoint + `uploadPhoto`,
            photoData,
            { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')) }
        );
    }

    public updateOrCreateSerie(serie: Serie): Observable<Serie> {
        return this.http.post<Serie>(
            this.apiEndpoint + `updateOrCreateSerie`,
            serie,
            { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')) }
        );
    }

    public deleteSerie(id: number): Observable<any> {
        return this.http.post<any>(
            this.apiEndpoint + `deleteSerie`,
            {id},
            { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')) }
        );
    }

    public login(userValue: {username: string, password: string}): Observable<any> {
        return this.http.post<any>(
            this.apiEndpoint + `login`,
            userValue
        );
    }
}
