import { Routes } from '@angular/router';
import { TrainerComponent } from "./trainer.component";

export const TrainerRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'trainerList',
      component: TrainerComponent,
      data: {
        breadcrumb: "Trainer List"
      }
    }]
  }
]
