import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./document-area/document-area.module').then(m => m.DocumentAreaModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./viewing-area/viewing-area.module').then(m => m.ViewingAreaModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report-area/report-area.module').then(m => m.ReportAreaModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-area/admin-area.module').then(m => m.AdminAreaModule)
  },
  {
    path: '**', redirectTo: 'report'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
