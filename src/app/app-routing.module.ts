import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoginGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) 
      },
      { 
        path: 'user', 
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) 
      },
      { 
        path: 'customer', 
        loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule) 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
