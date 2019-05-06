import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification-service';
import { IncidentVo } from 'src/app/data/incident-vo';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';

@Component({
  selector: 'app-inc-info-tab',
  templateUrl: './inc-info-tab.component.html',
  styleUrls: ['./inc-info-tab.component.css']
})
export class IncInfoTabComponent implements OnInit, AfterViewInit {
  @Input() incidentVo: IncidentVo = <IncidentVo>{incidentName: ''};
  incForm: FormGroup;

  constructor(private fb: FormBuilder
              , private incidentSelectorService: IncidentSelectorService
              , private notifyService: NotificationService) {
  }

  ngOnInit() {
    // get the default incidentVo from the service
    this.incidentVo = Object.assign({}, this.incidentSelectorService.currentVo as IncidentVo);
    this.initForm();
  }

  ngAfterViewInit() {
  }

  initForm() {
    this.incForm = this.fb.group({
      incidentName: new FormControl(this.incidentVo.incidentName)
    });
  }
}
