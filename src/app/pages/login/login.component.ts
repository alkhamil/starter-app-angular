import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Response } from 'src/app/models/response.model';
import { ToastService } from 'src/app/services/toast.service';
import { Login } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  onDestroy$ = new Subject<void>();

  form!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  get email() { return this.form.controls['email'] };

  get password() { return this.form.controls['password'] };

  onClickSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.login(this.form.value).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (result: Response<Login>) => {
        if (result.data.token && result.data.user) {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data.user));

          this.router.navigate(['/dashboard']);
          this.loading = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.error = true;
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    })
  }

  onCloseError() {
    this.error = false;
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
