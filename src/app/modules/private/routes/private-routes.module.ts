import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "../view/main-view/main-view.component";
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'news',
        loadChildren: () => import('.././news/news.module')
          .then(s => s.NewsModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutesModule { }
