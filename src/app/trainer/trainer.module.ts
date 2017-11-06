import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './trainer.component';
import { RouterModule } from '@angular/router';
import { TrainerRoutes } from './trainer.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TrainerRoutes),
    SharedModule
  ],
  declarations: [TrainerComponent]
})
export class TrainerModule { }
