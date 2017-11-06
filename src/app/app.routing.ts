import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';


export const AppRoutes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: './authentication/login/login.module#LoginModule'
  }, {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }, {
    path: 'facebook-auth',
    loadChildren: './facebook-auth/facebook-auth.module#FacebookAuthModule'
  }]
}, {
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard/dashboard-default',
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'trainer',
      loadChildren: './trainer/trainer.module#TrainerModule',
    }, {
      path: 'member',
      loadChildren: './client/client.module#ClientModule',
    }, {
      path: 'maintenance/error',
      loadChildren: './maintenance/error/error.module#ErrorModule'
    }, {
      path: 'user',
      loadChildren: './user/user.module#UserModule'
    }
  ]
}, {
  path: '**',
  redirectTo: 'error/404'
}];
