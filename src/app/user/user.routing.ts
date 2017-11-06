import { Routes } from '@angular/router';

export const UserRoutes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'profile/:id',
        loadChildren: './profile/profile.module#ProfileModule',
        data: {
          breadcrumb: "User Profile"
        }
      }
    ]
  }
]
