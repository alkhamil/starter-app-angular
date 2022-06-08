import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  appConfig!: AppConfig;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetch application config from params.json file
   */
  async init() {
    this.appConfig = await lastValueFrom(this.http.get<AppConfig>('./assets/params.json'));
    if (environment.production) {
      const localUrlAccess: string = location.host;
      if (localUrlAccess.startsWith('localhost') || localUrlAccess.startsWith('127.0.0.1')) {
        const currentUrlAccess = this.appConfig.apiUrl.split('//')[1].split('/')[0];
        this.appConfig.apiUrl = this.appConfig.apiUrl.replace(currentUrlAccess, localUrlAccess);
      }
    }
  }


}

