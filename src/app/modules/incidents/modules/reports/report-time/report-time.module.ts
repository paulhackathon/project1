import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportTimeViewComponent } from './report-time-view/report-time-view.component';

const routes: Routes = [
  { path: '', outlet: 'incidents-outlet', component: ReportTimeViewComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportTimeViewComponent,
  ]
})
export class ReportTimeModule { }
