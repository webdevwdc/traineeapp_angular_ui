import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookAuthComponent } from './facebook-auth.component';
import { RouterModule } from '@angular/router';
import { FacebookRoutes } from './facebook-auth.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FacebookRoutes),
    SharedModule
  ],
  declarations: [FacebookAuthComponent]
})
export class FacebookAuthModule { }
