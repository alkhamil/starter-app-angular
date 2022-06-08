import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AppInitService } from './app-init.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private appInitService: AppInitService,
        private httpClient: HttpClient,
    ) { }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        return localStorage.getItem('user');
    }

    revokeToken() {
        localStorage.clear();
        location.reload();
    }

    /**
     * set query params
     * @param request object
     */
    setQueryParams(request: { [x: string]: string | number | boolean; }) {
        let params = new HttpParams();
        for (const i in request) {
            params = params.set(i, request[i] ? request[i] : '');
        }
        return params.toString();
    }

    /**
     * Make a post request with Bearer authentication.
     * @param url string
     * @param body any
     * @param baseUrl string
     */
    privatePost<T>(url: string, body: {}, baseUrl = this.appInitService.appConfig.apiUrl) {
        return this.httpClient.post<T>(`${baseUrl}${url}`, body, {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.getToken()}`)
        }).pipe(
            tap(() => { },
                (error: any) => {
                    if (error.status == 401) {
                        this.revokeToken();
                    }
                }
            )
        );
    }

    /**
     * Make a get request with Bearer authentication.
     * @param url string
     * @param body any
     * @param baseUrl string
     */
    privateGet<T>(url: string, body: {}, baseUrl = this.appInitService.appConfig.apiUrl) {
        return this.httpClient.get<T>(`${baseUrl}${url}`, {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.getToken()}`)
        }).pipe(
            tap(() => { },
                (error: any) => {
                    if (error.status == 401) {
                        this.revokeToken();
                    }
                }
            )
        );
    }

    /**
     * Make a post auth request without authentication.
     * @param url string
     * @param body any
     * @param baseUrl string
     */
    publicPost<T>(url: string, body: {}, baseUrl = this.appInitService.appConfig.apiUrl) {
        return this.httpClient.post<T>(`${baseUrl}${url}`, body);
    }

    /**
     * Make a get request without authentication.
     * @param url string
     * @param body any
     * @param baseUrl string
     */
    publicGet<T>(url: string, body: {}, baseUrl = this.appInitService.appConfig.apiUrl) {
        return this.httpClient.get<T>(`${baseUrl}${url}`);
    }

}
