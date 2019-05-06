import { Component, OnInit } from '@angular/core';
import { IncidentSelectorService } from 'src/app/service/incident-selector.service';
import { IncidentSelector2Vo } from 'src/app/data/incident-selector2-vo';

@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {
  currentSelectedIncidentSelectorVo: IncidentSelector2Vo = <IncidentSelector2Vo>{};

  constructor(public incidentSelectorService: IncidentSelectorService) { }

  ngOnInit() {
    this.currentSelectedIncidentSelectorVo = this.incidentSelectorService.selectedGridRow;
    this.incidentSelectorService.selectedIncidentSelectorVo.subscribe(vo => {
      this.currentSelectedIncidentSelectorVo = Object.assign({}, vo);
    });
  }

}
