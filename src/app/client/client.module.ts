import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { ClientRoutes } from './client.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientRoutes),
    SharedModule
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
