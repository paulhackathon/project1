import { Component, OnInit, ViewChild } from '@angular/core';
import { EisGridComponent } from 'src/app/components/eis-grid/eis-grid.component';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { NotificationService } from 'src/app/service/notification-service';
import { SystemService } from 'src/app/service/system.service';
import { IncidentSelector2Vo } from 'src/app/data/incident-selector2-vo';
import { IncidentGroupVo } from 'src/app/data/incident-group-vo';
import { IncidentVo } from 'src/app/data/incident-vo';
import { IncViewIncidentsComponent } from '../inc-view-incidents/inc-view-incidents.component';
import { IncViewIncidentGroupComponent } from '../inc-view-incident-group/inc-view-incident-group.component';
import { ReferenceDataService } from 'src/app/service/reference-data-service';

@Component({
  selector: 'app-inc-view',
  templateUrl: './inc-view.component.html',
  styleUrls: ['./inc-view.component.css']
})
export class IncViewComponent implements OnInit {
  @ViewChild('incGrid') incGrid: EisGridComponent;
  @ViewChild('incViewIncidents') incViewIncident: IncViewIncidentsComponent;
  @ViewChild('incViewIncidentGroup') incViewIncidentGroup: IncViewIncidentGroupComponent;
  splitAreaLeftSize = 30;
  splitAreaRightSize = 70;
  viewMode = 'INCIDENT';
  actionMode = 'add'; // either add, edit, or delete
  incidentGridList = [];
  eventTypeData = [];
//  : DropdownData[] = [];

  gridColumnDefs = [
    {headerName: 'Incident #', field: 'incidentNumber', width: 130},
    {headerName: 'Event Type', field: 'eventType', width: 100},
    {headerName: 'Start Date', field: 'startDate', width: 100},
    {headerName: 'Jurisdiction', field: 'agency', width: 110},
    {headerName: 'Default Accounting Code', field: 'defaultAccountingCode'},
    {headerName: 'Default Accounting Code Agency', field: 'defaultAccountingCodeAgency'},
  ];

  constructor(private incidentSelectorService: IncidentSelectorService,
              private systemService: SystemService,
              private refDataService: ReferenceDataService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    // for SITE expand tree by default
    this.incGrid.groupDefaultExpanded = -1;

    // getDataPath tells ag-grid the field to use for the data hierarrchy
    this.incGrid.getDataPath = function(data) {
      return data.hierachalGroupField;
    };
    // autoGroupColumnDef is defining the column
    this.incGrid.autoGroupColumnDef = {
      headerName: 'Incident Name',
      filter: 'agTextColumnFilter',
      cellRendererParams: { suppressCount: true }
    };

    this.getEventTypes();
    this.refreshGrid();
  }

  buttonClass( btnName: string ) {
    return ( this.actionMode === btnName ? 'w3-small btn-selected' : 'w3-small btn-normal');
  }

  /*
   * get event type list
   */
  getEventTypes() {
    this.refDataService.getEventTypeList()
      .subscribe(data => {
        this.eventTypeData = data as any[];
        console.log('event types ');
        console.log(data);
      });
  }

  /*
   * Refresh the grid and reset variables
  */
  refreshGrid() {
    // reset view mode back to add incident
    this.addIncident();

    // this.incidentSelectorService.getGrid(this.systemService.userSessionVo['userId'])
    this.incidentSelectorService.getGrid(10052)
      .subscribe(data => {
        this.notifyService.inspectResult(data);
        if ( data['courseOfActionVo']['coaName'] === 'GET_SELECTOR_VOS' ) {
          this.incidentGridList = data['recordset'] as IncidentSelector2Vo[];
          // console.log(JSON.stringify(this.incidentGridList));
        }
      });
  }

  /*
   * Event Handler for when a row is selected from <app-eis-grid>
   */
  onSelectIncidentRow(row: any) {

    // set defaults when new selection is made
    this.incidentSelectorService.isManagedAsGroup = true;
    this.incidentSelectorService.selectedGridRow = row as IncidentSelector2Vo;
    this.incidentSelectorService.setSelectedIncidentSelectorVo(row as IncidentSelector2Vo);

    // for SITE, edit inc and edit inc group share same button on top action bar
    // for ENT, TODO check if there is an edit incident group btn
    this.actionMode = 'edit';

    // row.type is from the IncidentSelector2Vo.type field (either INCIDENT or INCIDENTGROUP)
    this.viewMode = row.type;
  }

  /*
   * Event Handler for when customize grid columns icon is clicked from <app-grid-icon-bar>
   */
  customizeColumnsEvent() {
    console.log('customColumnEvent');
  }

  /*
   * Event Handler for when refresh grid icon is clicked from <app-grid-icon-bar>
   */
  refreshGridEvent() {
    // clear selected grid row and filters
    this.incGrid.clearFilters();
    this.incGrid.clearSelected();

    this.refreshGrid();
    this.addIncident();
  }

  /*
   * Event Handler for when clear filter grid icon is clicked from <app-grid-icon-bar>
   */
  clearFilterEvent() {
    console.log('clearfilterEvent');
 }

  expandRetractEvent() {
    if ( this.splitAreaLeftSize > 30 ) {
      this.splitAreaLeftSize = 30;
      this.splitAreaRightSize = 70;
    } else {
      this.splitAreaLeftSize = 100;
      this.splitAreaRightSize = 0;
    }
  }

 addIncident() {
    this.actionMode = 'add';
    this.viewMode = 'INCIDENT';
    setTimeout(() => {
      this.incViewIncident.addNew()
    });
  }

  editIncident() {
  }

  deleteIncident() {

  }

}
