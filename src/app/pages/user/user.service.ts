import { Injectable } from '@angular/core';
import { Page, Responses } from 'src/app/models/response.model';
import { HttpService } from 'src/app/services/http.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpService
  ) { }

  index(request: {}) {
    return this.http.privateGet<Responses<Page<User[]>>>('/user?' + this.http.setQueryParams(request), {});
  }

  view(request: {}) {
    return this.http.privateGet<any>('/user/view?' + this.http.setQueryParams(request), {});
  }

  save(request: {}) {
    return this.http.privatePost<any>('/user/save', request);
  }

  update(request: {}) {
    return this.http.privatePost<any>('/user/update', request);
  }

  delete(request: {}) {
    return this.http.privateGet<any>('/user/delete?' + this.http.setQueryParams(request), {});
  }

}
