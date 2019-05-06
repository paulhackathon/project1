import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportCostViewComponent } from './report-cost-view/report-cost-view.component';

const routes: Routes = [
  { path: '', outlet: 'incidents-outlet', component: ReportCostViewComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportCostViewComponent]
})
export class ReportCostModule { }
