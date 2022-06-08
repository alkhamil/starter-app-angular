import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Response } from 'src/app/models/response.model';
import { HttpService } from 'src/app/services/http.service';
import { User } from '../user/user.model';
import { Login, Logout } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl!: string;
  user$ = new BehaviorSubject<User | any>(null);

  constructor(
    private http: HttpService
  ) { }

  login(request: {}) {
    return this.http.publicPost<Response<Login>>('/auth/login', request).pipe(
      tap((result: Response<Login>) => {
        this.user$.next(result.data);
      })
    );
  }

  logout(request: {}) {
    return this.http.privatePost<Response<Logout>>('/auth/logout', request);
  }

  isLoggedIn(): Boolean {
    return !!this.http.getToken();
  }

}
