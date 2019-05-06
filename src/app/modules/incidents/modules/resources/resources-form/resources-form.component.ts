import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styleUrls: ['./resources-form.component.css']
})
export class ResourcesFormComponent implements OnInit {
  public _selectedDataTab = "checkin";
  _resourceForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this._resourceForm = this.formBuilder.group({
        person: false,
        incidentId: '',
        firstName: '',
        lastName: '',
        });
  }
  dataTabSelect(tabname) {
    this._selectedDataTab = tabname;
  }

  getActiveTab(tabname) {
    if(this._selectedDataTab === tabname) {
      return '';
    } else {
      return 'hidden';
    }
  }

}
