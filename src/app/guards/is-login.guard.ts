import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { LoginService } from '../pages/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (this.loginService.isLoggedIn()) {
            this.router.navigateByUrl('dashboard')
        }
        return true;
    }

}
