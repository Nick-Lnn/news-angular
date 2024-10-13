import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainViewComponent} from "../view/main-view/main-view.component";

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
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
export class PrivateRoutesModule {
}
