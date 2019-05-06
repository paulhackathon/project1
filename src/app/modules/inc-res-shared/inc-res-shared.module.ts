import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { IncidentsNavBarComponent } from '../incidents/incidents-nav-bar/incidents-nav-bar.component';
import { ResourceGridComponent } from './resource-grid/resource-grid.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(null),
  ],
  declarations: [
    IncidentsNavBarComponent,
    ResourceGridComponent,
  ],
  exports: [
    IncidentsNavBarComponent,
    ResourceGridComponent,
  ]
})
export class IncResSharedModule { }
