import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DropdownData } from '../../../../../data/dropdowndata';
import { UserGridVo } from '../../../data/userGridVo';
import { ValidUserVo } from '../../../data/validUserVo';
import { UserService } from 'src/app/service/user.service';
import { ReferenceDataService } from 'src/app/service/reference-data-service';
import { ValuesDropZonePanel } from 'ag-grid-enterprise';
@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.css']
})


export class ImportUserComponent implements OnInit {
  private importGrid;
  columnDefs = [
    { headerName: 'User Name', field: 'loginName' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Unit ID', field: 'homeUnitCode' }
  ];

  fileData = null;
  file: any;
  fileName: string = '';
  rowData: any = [];
  conflictDesc: string = '';
  conflictDisable: boolean = true;

  importForm = new FormGroup({
    txtFile: new FormControl(null, Validators.required),
    defaultPassword: new FormControl('Utahjazz!234567', Validators.required),
    confirmDefaultPassword: new FormControl('Utahjazz!234567', Validators.required),
  });

  homeUnitCodeData: DropdownData[] = [];
  pdcUnitCodeData = [];
  homeUnitCode: DropdownData;
  pdcUnitCode: DropdownData;

  conflictForm = new FormGroup({
    loginName: new FormControl({ value: '', disable: true }),
    firstName: new FormControl({ value: '', disable: true }),
    lastName: new FormControl({ value: '', disable: true }),
    homeUnitVo: new FormControl({ id: 0, code: '', desc: '', disable: true }),
    pdcVo: new FormControl({ id: 0, code: '', desc: '', disable: true }),
  })

  constructor(private userService: UserService, private refDataService: ReferenceDataService) { }

  ngOnInit() {
    //Clear and disable form on load
    this.conflictForm.reset();
    this.conflictForm.disable();
    var orgData = this.populateLists();
    //Listen to form changes and update grid accordingly
    this.conflictForm.valueChanges.subscribe(val => {
      if (this.importGrid.getSelectedNodes()[0] !== undefined && !this.conflictForm.pristine) {
        var currentNode = this.importGrid.getSelectedNodes()[0];
        Object.keys(this.conflictForm.controls).forEach(key => {
          //Saving homeUnitVo, working in progress
          if(key == 'homeUnitVo'){
            orgData.forEach(item=>{
              if(item.id == val.homeUnitVo['id']){
                currentNode.setDataValue(key,item)
              }
            })
          }
          currentNode.setDataValue(key, val[key]);
        });
        this.conflictForm.markAsPristine();
      }
    })
  }

  populateLists() {
    var orgData = [];
    this.refDataService.getStandardOrgList()
      .subscribe(data => {
        for (let i in data.recordset) {
          var recordSet = data.recordset[i];
          var item: DropdownData = { id: recordSet.id, code: recordSet.unitCode, desc: recordSet.name, adddata: recordSet.dispatchCenters }
          this.homeUnitCodeData.push(item);
          orgData.push(recordSet);
        }
      });
      return orgData;
  }
  onGridReady(event) {
    this.importGrid = event.api;
  }
  setConflictDisable() {
    this.conflictDisable = true;
    this.conflictForm.disable();
    this.conflictForm.reset();
    this.homeUnitCode = { id: 0, code: '', desc: ''};
    this.pdcUnitCode = { id: 0, code: '', desc: ''};
  }
  setConflictEnable() {
    this.conflictDisable = false;
    this.conflictForm.enable();
  }
  onSelect(event) {
    var currentNode = this.importGrid.getSelectedNodes()[0];
    // console.log(currentNode.data);
    var pdcId = 0;
    if (currentNode !== undefined) {
      this.setConflictEnable()
      this.conflictDesc = currentNode.data.failureReason;
      this.homeUnitCodeData.forEach(item=>{
        if(item.id === currentNode.data.homeUnitVo.id){
          this.homeUnitCode = item;
          pdcId = currentNode.data.primaryDispatchCenterVo.id;
        }
      });
      this.pdcUnitCodeData = this.homeUnitCode.adddata;
      this.pdcUnitCodeData.forEach(item=>{
        if(pdcId === item.id){
          this.pdcUnitCode = {id: item.id, code:item.unitCode, desc:item.name};
        }
      })
      this.conflictForm.setValue({
        loginName: currentNode.data.loginName,
        firstName: currentNode.data.firstName,
        lastName: currentNode.data.lastName,
        homeUnitVo: this.homeUnitCode,
        pdcVo: this.pdcUnitCode
      });
    }
    else {
      this.setConflictDisable();
    }
  }
  uploadFile(event) {
    if (event.target.files.length <= 0) {
      return;
    }
    this.file = event.target.files[0];
    const blob = new Blob([this.file])
    this.fileName = event.target.files[0].name;
    var arrayBuffer = null;
    var fileReader = new FileReader;
    fileReader.onload = (e: any) => {
      arrayBuffer = e.target.result;
      this.importForm.patchValue({
        txtFile: this.fileName,
      })
      this.fileData = new Int8Array(arrayBuffer);
    }
    fileReader.readAsArrayBuffer(blob);
    fileReader.result;
  }

  onImport() {
    this.setConflictDisable();
    var array = Array.from(this.fileData)
    this.userService.importUsers(
      this.importForm.get('defaultPassword').value,
      this.importForm.get('confirmDefaultPassword').value,
      array)
      .subscribe(data => {
        this.rowData = data.resultObjectAlternate;
      });
  }

  //Hae some bug with deleted rows near the end
  removeFromImport() {
    var currentRow = this.importGrid.getSelectedRows();
    var siblingIndex = this.getSiblingIndex(this.importGrid.getSelectedNodes()[0]);
    // var nextIndex = parseInt(this.importGrid.getSelectedNodes()[0].id) + 1;
    this.importGrid.updateRowData({ remove: currentRow });
    try {
      this.importGrid.getRowNode(siblingIndex).setSelected(true);
    }
    catch{
      this.setConflictDisable();
      console.error('No row selected');
    }
  }
  getSiblingIndex(row) {
    var current = parseInt(row.id);
    var next = current + 1;
    var prev = current - 1;
    return this.importGrid.getRowNode(next) !== undefined ? next : prev;
  }

  onUnitChange(event) {
    this.homeUnitCode = event;
    this.pdcUnitCodeData = [];
    event.adddata.forEach(pdc => {
      this.pdcUnitCodeData.push({ id: pdc.id, code: pdc.unitCode, desc: pdc.name });
    });
    this.pdcUnitCode = this.pdcUnitCodeData[0];
    this.conflictForm.patchValue({homeUnitVo: this.homeUnitCode,pdcVo: this.pdcUnitCode});
  }
  saveConflictResolution() {
    this.conflictForm.patchValue({
      homeUnitCode: this.homeUnitCode,
      pdcUnitCode: this.pdcUnitCode
    })
    var validUserVoArr = [];
    this.importGrid.forEachLeafNode((node, index) => {
      var validUserVo = new ValidUserVo;
      Object.keys(validUserVo).forEach(key => {
        validUserVo[key] = node.data[key];
      })
      validUserVoArr.push(validUserVo);
    });
    console.log(validUserVoArr);
    this.userService.resolveImport(JSON.stringify(validUserVoArr))
      .subscribe(result => {
        console.log(result);
        // if(result.courseOfActionVo.coaType == 'ERROR'){
        //   console.log(result.courseOfActionVo['errorObjectVos']);
        // }
        // else{
        //   console.log('No errors');
        // }
      });
  }
}