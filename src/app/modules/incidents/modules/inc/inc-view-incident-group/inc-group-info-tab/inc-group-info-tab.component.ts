import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification-service';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { IncidentGroupVo } from 'src/app/data/incident-group-vo';

@Component({
  selector: 'app-inc-group-info-tab',
  templateUrl: './inc-group-info-tab.component.html',
  styleUrls: ['./inc-group-info-tab.component.css']
})
export class IncGroupInfoTabComponent implements OnInit {
  igForm: FormGroup;
  incidentGroupVo: IncidentGroupVo = <IncidentGroupVo>{};

  constructor(private notifyService: NotificationService
                , private incidentSelectorService: IncidentSelectorService
                , private fb: FormBuilder ) {

  }

  ngOnInit() {
    // get default incident group vo
    this.incidentGroupVo = this.incidentSelectorService.currentVo as IncidentGroupVo;

    this.initForm();
  }

  initForm() {
    this.igForm = this.fb.group({
      groupName: new FormControl(this.incidentGroupVo.groupName)
    });
  }

  save() {

  }

  cancel() {
    this.initForm();
  }
}
