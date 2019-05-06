import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportTnspViewComponent } from './report-tnsp-view/report-tnsp-view.component';

const routes: Routes = [
  { path: '', outlet: 'incidents-outlet', component: ReportTnspViewComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportTnspViewComponent]
})
export class ReportTnspModule { }
