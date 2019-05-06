import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncResSharedModule } from '../../../inc-res-shared/inc-res-shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { AgGridModule } from 'ag-grid-angular';
import { IncViewComponent } from './inc-view/inc-view.component';
import { SharedModule } from 'src/app/shared';
import { IncViewIncidentsComponent } from './inc-view-incidents/inc-view-incidents.component';
import { IncViewIncidentGroupComponent } from './inc-view-incident-group/inc-view-incident-group.component';
import { IncGroupInfoTabComponent } from './inc-view-incident-group/inc-group-info-tab/inc-group-info-tab.component';
import { IncInfoTabComponent } from './inc-view-incidents/inc-info-tab/inc-info-tab.component';
import { IncAcctCodeTabComponent } from './inc-view-incidents/inc-acct-code-tab/inc-acct-code-tab.component';
import { IncRefDataTabComponent } from './inc-view-incidents/inc-ref-data-tab/inc-ref-data-tab.component';

const routes: Routes = [
  { path: '', pathMatch: "full", outlet: 'incidents-outlet', component: IncViewComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularSplitModule,
    ReactiveFormsModule,
    IncResSharedModule,
    AgGridModule.withComponents(null),
    RouterModule.forChild(routes),
  ],
  declarations: [
    IncViewComponent,
    IncViewIncidentGroupComponent,
    IncGroupInfoTabComponent,
    IncViewIncidentsComponent,
    IncInfoTabComponent,
    IncAcctCodeTabComponent,
    IncRefDataTabComponent,
  ]
})
export class IncModule { }
