import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { IncidentSelector2Vo } from 'src/app/data/incident-selector2-vo';

@Component({
  selector: 'app-incidents-nav-bar',
  templateUrl: './incidents-nav-bar.component.html',
  styleUrls: ['./incidents-nav-bar.component.css']
})
export class IncidentsNavBarComponent implements OnInit {
  @Output() menuSelectEvent = new EventEmitter<string>();
  showIncidentDropdown = false;
  frm: FormGroup;
  showReportsNavBar = false;
  _name = '';

  constructor(private router: Router
                , private fb: FormBuilder
                , public incidentSelectorService: IncidentSelectorService) { }

  ngOnInit() {
    this.showIncidentDropdown = (this.incidentSelectorService.isManagedAsGroup === true ? false : true );
    this.incidentSelectorService.selectedSubTab = '';
    this.initForm();
  }

  initForm() {
    this.frm = this.fb.group({
      manageAsGroup: new FormControl(this.incidentSelectorService.isManagedAsGroup)
      , selectedIncident: new FormControl(this.incidentSelectorService.selectedDropdownIncidentId)
    });
  }

  tabClick(tabName, subTabName, resmode) {
    // set selected top-level tab
    this.incidentSelectorService.selectedTab = tabName;
    // set selected sub-level tab
    this.incidentSelectorService.selectedSubTab = subTabName;
    // set resource mode
    this.incidentSelectorService.resourcesMode = resmode;
    this._name = tabName;
    if ( tabName.indexOf('reports') > 0) {
      this.showReportsNavBar = true;
    } else {
      this.showReportsNavBar = false;
    }
    this.router.navigate([tabName]);
  }

  menuSelect(menuName: string) {
    this._name = menuName;
    this.showReportsNavBar = menuName.startsWith('/incidents/reports');
    this.menuSelectEvent.emit(menuName);
  }

  getStyle(area, subTab) {
    if (this.router.url === area || this.router.url.startsWith(area)) {
      if ( this.incidentSelectorService.selectedSubTab === subTab) {
        return 'btn-selected';
      }
    } else {
      return 'btn-normal';
    }
  }

  getActiveReportsTab(rpttab) {
    return 'btn-selected';
  }

  /*
   * Event Handler for when manage as group checkbox is changed
   */
  onChangeManageAsGroup( event: any ) {
    this.incidentSelectorService.setIsManagedAsGroup(event.target.checked);
    this.showIncidentDropdown = (this.incidentSelectorService.isManagedAsGroup === true ? false : true );
    if (this.incidentSelectorService.isManagedAsGroup === false ) {
      // default incident dropdown to first item
      if ( this.incidentSelectorService.selectedGridRow.children.length > 0 ) {
        // set selected dropdown incident id
        this.incidentSelectorService.setSelectedDropdownIncidentId(
          this.incidentSelectorService.selectedGridRow.children[0].incidentId);

        // set the selected vo
        this.incidentSelectorService.setSelectedIncidentSelectorVo(
          this.incidentSelectorService.selectedGridRow.children[0]);

        this.initForm();
      }
    } else {
        // set the selected vo
        this.incidentSelectorService.setSelectedIncidentSelectorVo(
          this.incidentSelectorService.selectedGridRow);
    }
  }

  /*
   * Event Handler for when manage as group dropdown row is selected
   */
  onChangeSelectIncident( event: any ) {
    // set selected dropdown incident id
    this.incidentSelectorService.setSelectedDropdownIncidentId(
       this.incidentSelectorService.selectedGridRow.children[event.target.selectedIndex].incidentId);

    // set the selected vo
    this.incidentSelectorService.setSelectedIncidentSelectorVo(
       this.incidentSelectorService.selectedGridRow.children[event.target.selectedIndex]);
  }

}
