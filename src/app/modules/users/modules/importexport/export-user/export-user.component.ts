import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/service/notification-service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { PromptModalComponent } from '../../../../../components/prompt-modal/prompt-modal.component'
import { UserGridVo } from '../../../../../modules/users/data/userGridVo';
import { SystemRoleVo } from '../../../../../modules/users/data/systemRoleVo';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-export-user',
  templateUrl: './export-user.component.html',
  styleUrls: ['./export-user.component.css']
})
export class ExportUserComponent implements OnInit {
  @ViewChild('exportUserGrid') exportUserGrid: AgGridNg2;
  @ViewChild('promptModal') promptModal: PromptModalComponent;
  @ViewChild('downloadModal') downloadModal: PromptModalComponent;

  columnDefs = [
    { headerName: 'Exclude User', field: 'excludeUser', width: 110, cellRenderer: 'checkboxRenderer' },
    { headerName: 'User Name', field: 'loginName', width: 130 },
    { headerName: 'First Name', field: 'firstName', width: 200 },
    { headerName: 'Last Name', field: 'lastName', width: 200 },
    { headerName: 'Unit ID', field: 'homeUnitCode', width: 135 }
  ];
  rowSelected = false;
  rowData: any;
  fileUrl;
  private _userGridVoData = [];
  constructor(private userService: UserService
    , private notifyService: NotificationService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  checkboxRenderer(params) {
    if (params.value == true) {
      var imgEle = document.createElement('img');
      imgEle.src = 'assets/images/checkbox-smallest.png';
      imgEle.style.display = 'block';
      imgEle.style.width = '16px';
      imgEle.style.paddingTop = '3px';
      params.eGridCell.appendChild(imgEle);
    }
  }
  getCurrentNode(currentNode, isExcluded) {
    var itemToUpdate = [];
    currentNode.excludeUser = isExcluded;
    itemToUpdate.push(currentNode);
    return itemToUpdate
  }
  selectRow() {
    var currentNode = this.exportUserGrid.api.getSelectedNodes()[0].data;
    var itemToUpdate = this.getCurrentNode(currentNode, true)
    this.exportUserGrid.api.updateRowData({ update: itemToUpdate })
  }
  deselectRow() {
    var currentNode = this.exportUserGrid.api.getSelectedNodes()[0].data;
    var itemToUpdate = this.getCurrentNode(currentNode, false)
    this.exportUserGrid.api.updateRowData({ update: itemToUpdate })
  }
  loadUsers() {
    this.userService.getUserList()
      .subscribe(data => {
        this.notifyService.inspectResult(data);
        if (data['courseOfActionVo']['coaType'] === 'HANDLE_RECORDSET') {
          this.rowData = data['recordset'];
          for (let i in this.rowData) {
            this.rowData[i].excludeUser = false;
          }
        }
      });
  }
  exportUsers() {
    var tempRowData = this.rowData;
    tempRowData.forEach(item => {
      var tempItem = new UserGridVo;
      if (!item.excludeUser) {
        Object.keys(tempItem).forEach(key => {
          tempItem[key] = item[key];
        })
        this._userGridVoData.push(tempItem);
      }
    });
    this.promptModal.promptTitle = 'Exclude User Accounts';
    this.promptModal.promptMessage1 = 'Do you want to export non-excluded user accounts to a file?';
    this.promptModal.button1Label = 'Yes';
    this.promptModal.button2Label = 'No';
    this.promptModal.openModal();
  }

  promptActionResult(action) {
    if (action == 'Yes') {
      this.downloadModal.openModal();
    }
    this.promptModal.closeModal();
  }
  modalDownload(fileName) {
    this.userService.exportUsers(JSON.stringify(this._userGridVoData))
      .subscribe(res => {
        var data = new Int8Array(res);
        this.downloadFile(data, fileName);
      })
    this.downloadModal.closeModal();
  }
  downloadFile(data, fileName) {
    var anchor = document.createElement('a');
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = fileName + '.usr';
    anchor.click();
  }
}