import { Routes } from '@angular/router';
import { FacebookAuthComponent } from "./facebook-auth.component";

export const FacebookRoutes: Routes = [
  {
    path: ':id',
    children: [{
      path: '',
      component: FacebookAuthComponent,
      data: {
      }
    }]
  }
]
