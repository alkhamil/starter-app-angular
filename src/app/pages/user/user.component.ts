import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, throwError } from 'rxjs';
import { Page, Responses } from 'src/app/models/response.model';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  onDestroy$ = new Subject<void>();
  data!: Responses<Page<User[]>>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.getIndex();
  }

  getIndex() {
    this.userService.index({}).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (result: Responses<Page<User[]>>) => {
        this.data = result;
        console.log(this.data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
