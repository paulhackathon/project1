import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AngularSplitModule } from 'angular-split';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesViewComponent } from './resources-view/resources-view.component';
import { ResourcesFormComponent } from './resources-form/resources-form.component';
import { ResourcesTimeComponent } from './resources-time/resources-time.component';
import { ResourceGridComponent } from './resource-grid/resource-grid.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', outlet: 'incidents-outlet', component: ResourcesViewComponent, children: [
    { path: '', outlet: 'resources-outlet', component: ResourcesFormComponent},
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSplitModule,
    AgGridModule.withComponents(null),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ResourceGridComponent,
    ResourcesViewComponent,
    ResourcesFormComponent,
    ResourcesTimeComponent,
  ]
})
export class ResourcesModule { }
