import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-plans-view',
  templateUrl: './report-plans-view.component.html',
  styleUrls: ['./report-plans-view.component.css']
})
export class ReportPlansViewComponent implements OnInit {
  _selectedReport = 'all-resources';
  constructor() { }

  ngOnInit() {
  }

  selectReport(reportName) {
    this._selectedReport = reportName;
  }

  buttonClass(reportName) {
    if(this._selectedReport === reportName)
      return 'w3-small h26 btn-selected';
    else
      return 'w3-small h26';
  }
}
