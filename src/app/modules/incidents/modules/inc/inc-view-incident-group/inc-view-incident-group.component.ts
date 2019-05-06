import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification-service';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { IncidentGroupVo } from 'src/app/data/incident-group-vo';
import { IncGroupInfoTabComponent } from './inc-group-info-tab/inc-group-info-tab.component';

@Component({
  selector: 'app-inc-view-incident-group',
  templateUrl: './inc-view-incident-group.component.html',
  styleUrls: ['./inc-view-incident-group.component.css']
})
export class IncViewIncidentGroupComponent implements OnInit {
  selectedGroupTab = '';
  incidentGroupVo: IncidentGroupVo = <IncidentGroupVo>{};
  @ViewChild('incGroupInfoTab') incGroupInfoTabComponent: IncGroupInfoTabComponent;

  constructor(private incidentSelectorService: IncidentSelectorService ) {
   }

  ngOnInit() {
    // subscribe to selectedIncidentSelectorVo to handle when incident group selection changes
    this.incidentSelectorService.selectedIncidentSelectorVo.subscribe(vo => {
      this.getIncidentGroupById(vo.incidentGroupId);
    });

    // get the default incidentGroupId, the first time page loads after ngIf
    // the above subscribe method is not triggered, it only gets triggered
    // once the page is loaded and a new incident group is selected from the grid
    this.getIncidentGroupById(this.incidentSelectorService.selectedGridRow.incidentGroupId);

    this.selectedGroupTab = 'groupinfo';
  }

  getIncidentGroupById(id: number) {
    // TODO : getById from rest
    this.incidentGroupVo = <IncidentGroupVo>{};
    this.incidentGroupVo.groupName = this.incidentSelectorService.selectedGridRow.name;
    this.incidentSelectorService.currentVo = this.incidentGroupVo;
    if ( this.incGroupInfoTabComponent === undefined ) {
      // console.log('inc info tab is undefined ');
    } else {
      // update child components
      this.incGroupInfoTabComponent.incidentGroupVo = Object.assign({}, this.incidentGroupVo);
      this.incGroupInfoTabComponent.initForm();
    }
  }

  dataTabSelect(tabname) {
    this.selectedGroupTab = tabname;
  }

  getStyle(menuName) {
    return ( this.selectedGroupTab === menuName ? 'btn-selected' : '' );
  }

}
