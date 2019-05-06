import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { IncidentVo } from 'src/app/data/incident-vo';
import { IncInfoTabComponent } from './inc-info-tab/inc-info-tab.component';

@Component({
  selector: 'app-inc-view-incidents',
  templateUrl: './inc-view-incidents.component.html',
  styleUrls: ['./inc-view-incidents.component.css']
})
export class IncViewIncidentsComponent implements OnInit, AfterViewInit {
  public selectedIncidentTab = '';
  incidentVo: IncidentVo = <IncidentVo>{};
  @ViewChild('incInfoTab') incInfoTabComponent: IncInfoTabComponent;

  constructor(private incidentSelectorService: IncidentSelectorService) {
  }

  ngOnInit() {
    // subscribe to selectedIncidentSelectorVo to handle when incident selection changes
    this.incidentSelectorService.selectedIncidentSelectorVo.subscribe(vo => {
      this.getIncidentById(vo.incidentId);
    });

    // get the default incidentId, the first time page loads after ngIf
    // the above subscribe method is not triggered, it only gets triggered
    // once the page is loaded and a new incident is selected from the grid
    this.getIncidentById(this.incidentSelectorService.selectedGridRow.incidentId);

    this.selectedIncidentTab = 'incidentinfo';
  }

  ngAfterViewInit() {
  }

  getIncidentById(id: number) {
    // TODO : getById from rest
    this.incidentVo = <IncidentVo>{};
    this.incidentVo.incidentName = this.incidentSelectorService.selectedGridRow.name;
    this.incidentSelectorService.currentVo = this.incidentVo;
    if ( this.incInfoTabComponent === undefined ) {
      // console.log('inc info tab is undefined ');
    } else {
      // update child components
      this.incInfoTabComponent.incidentVo = Object.assign({}, this.incidentVo);
      this.incInfoTabComponent.initForm();
    }
  }

  dataTabSelect(tabname) {
    this.selectedIncidentTab = tabname;
  }

  getStyle(menuName) {
    return ( this.selectedIncidentTab === menuName ? 'btn-selected' : '' );
  }

  getActiveTab(tabname) {
    return ( this.selectedIncidentTab === tabname ? '' : 'hidden');
  }

  addNew() {
    this.incidentVo = <IncidentVo>{
      id: 0,
      incidentName: ''
    };
    this.incInfoTabComponent.incidentVo = Object.assign({}, this.incidentVo);
    this.incInfoTabComponent.initForm();
  }
}
