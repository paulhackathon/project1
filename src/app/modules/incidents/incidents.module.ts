import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IncResSharedModule } from '../inc-res-shared/inc-res-shared.module';
import { RossimportModule } from './modules/rossimport/rossimport.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { ReportPlansModule } from './modules/reports/report-plans/report-plans.module';
import { ReportTimeModule } from './modules/reports/report-time/report-time.module';
import { ReportCostModule } from './modules/reports/report-cost/report-cost.module';
import { ReportTnspModule } from './modules/reports/report-tnsp/report-tnsp.module';
import { ReportCustomModule } from './modules/reports/report-custom/report-custom.module';
import { IncidentsViewComponent } from './incidents-view/incidents-view.component';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';

const routes: Routes = [
  { path: '', component: IncidentsViewComponent, children: [
    { path: '', redirectTo: 'inc', pathMatch: 'full'},
    { path: 'inc', loadChildren: './modules/inc/inc.module#IncModule'},
  ]},
  { path: 'resources', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/resources/resources.module#ResourcesModule'},
  ]},
  { path: 'reports/plans', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/reports/report-plans/report-plans.module#ReportPlansModule'}
  ]},
  { path: 'reports/time', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/reports/report-time/report-time.module#ReportTimeModule'}
  ]},
  { path: 'reports/cost', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/reports/report-cost/report-cost.module#ReportCostModule'}
  ]},
  { path: 'reports/training', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/reports/report-tnsp/report-tnsp.module#ReportTnspModule'}
  ]},
  { path: 'reports/custom', component: IncidentsViewComponent, children: [
      {path: '', loadChildren: './modules/reports/report-custom/report-custom.module#ReportCustomModule'}
  ]},
  { path: 'rossimport', component: IncidentsViewComponent, children: [
    { path: '', loadChildren: './modules/rossimport/rossimport.module#RossimportModule'},
  ]},
  { path: 'finexp', component: IncidentsViewComponent, children: [
    { path: '', loadChildren: './modules/financialexport/financialexport.module#FinancialexportModule'},
  ]},
  { path: 'datatransfer', component: IncidentsViewComponent, children: [
    { path: '', loadChildren: './modules/datatransfer/datatransfer.module#DatatransferModule'},
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncResSharedModule,
    RossimportModule,
    ResourcesModule,
    ReportPlansModule,
    ReportTimeModule,
    ReportCostModule,
    ReportTnspModule,
    ReportCustomModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  declarations: [
    IncidentsViewComponent,
  ],
  providers: [
    IncidentSelectorService,
  ]
})
export class IncidentsModule { }
