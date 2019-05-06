import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { UserData } from '../../../../../../data/user-data';
import { Subject } from 'rxjs';
import { DropdownData } from 'src/app/data/dropdowndata';
import { SystemService } from 'src/app/service/system.service';
import { UserVo } from 'src/app/data/user-vo';
import { UserGridVo } from 'src/app/modules/users/data/userGridVo';
import { UserService } from 'src/app/service/user.service';
import { OrganizationVo } from 'src/app/data/organization-vo';
import { SystemRoleVo } from 'src/app/data/system-role-vo';
import { NotificationService } from 'src/app/service/notification-service';

@Component({
  selector: 'app-user-account-form',
  templateUrl: './user-account-form.component.html',
  styleUrls: ['./user-account-form.component.css']
})
export class UserAccountFormComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  userForm: FormGroup;
  userVo: UserVo;
  orgList = [];
  orgUnitCode: DropdownData;
  orgList2: DropdownData[] = [];
  pdcList = [];
  pdcUnitCode: DropdownData;
  pdcList2: DropdownData[] = [];
  systemRoles = [];
  privilegedRoles = [];
  nonPrivilegedRoles = [];
  newUser = true;
 // @ViewChild('eisUnit') unitDropdown: EisDropdownComponent;

  constructor( private formBuilder: FormBuilder,
                private systemService: SystemService,
                private userService: UserService,
                private nofityService: NotificationService ) {
    this.userForm = this.formBuilder.group({
      enabled: new FormControl(false),
      id: new FormControl(0),
      loginName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      pwd: new FormControl({value: '', disabled: true}),
      cpwd: new FormControl({value: '', disabled: true}),
      workPhone: new FormControl(''),
      cellPhone: new FormControl(''),
      email: new FormControl(''),
      homeUnitVo: new FormControl({id:0,code:'',desc:''}),
      pdcVo: new FormControl({id:0,code:'',desc:''}),
      roletype: new FormControl(''),
    });
  }
  ngOnInit() {
    this.initUserVo();
    this.loadRoles();
  }

  initUserVo() {
    this.userVo = <UserVo>{
      id: 0
      , loginName: ''
      , firstName: ''
      , lastName: ''
      , homeUnitVo: <OrganizationVo>{id: 0}
      , primaryDispatchCenterVo: <OrganizationVo>{id: 0}
      , password: ''
      , enteredPassword: ''
      , desiredPassword: ''
      , confirmPassword: ''
      , resetPassword: false
      , showDataSavedMsg: true
      , email: ''
      , workPhone: ''
      , cellPhone: ''
      , failedLoginAttempts: 0
      , enabled: true
      , userRoleVos: <any>[]
      , adminUser: false
      };
  }

  loadRoles() {
    this.systemService.getSystemRoles()
      .subscribe(data => {
        if ( data['courseOfActionVo']['coaType'] === 'HANDLE_RECORDSET') {
          this.systemRoles = data['recordset'] as any[];
       }
    });

    this.rebuildRoles('');
  }

  rebuildRoles( roleType ) {
    // reset both role arrays
    this.privilegedRoles = this.systemRoles.filter(role => role.privilegedRole === true );
    this.nonPrivilegedRoles = this.systemRoles.filter(role => role.privilegedRole === false );
    // default priv roles as checked since there is one 1 role
    this.privilegedRoles.forEach( function (row, index) { row.checked = true; });
    this.nonPrivilegedRoles.forEach( function (row, index) { row.checked = false; });

    if ( this.userVo.id > 0 ) {
      // need to determine which ones should be checked
      if ( roleType === 'priv' ) {
        for ( const role of this.userVo['userRoleVos'] ) {
          const idx = this.getIndexById(role['id'], this.privilegedRoles );
          if ( idx > -1 ) {
            this.privilegedRoles[idx].checked = true;
          }
        }
      }
      if ( roleType === 'nonpriv' ) {
        for ( const role of this.userVo['userRoleVos'] ) {
          const idx = this.getIndexById(role['id'], this.nonPrivilegedRoles );
          if ( idx > -1 ) {
            this.nonPrivilegedRoles[idx].checked = true;
          }
        }
      }
    }
  }

  updatePrivRoleRow(roleId, event) {
    const idx = this.getIndexById(roleId, this.privilegedRoles);
    if( idx > -1 ) {
      this.privilegedRoles[idx].checked = event.target.checked;
    }
    // console.log(this.privilegedRoles[idx].checked);
  }

  updateNonPrivRoleRow(roleId, event) {
    const idx = this.getIndexById(roleId, this.nonPrivilegedRoles);
    if( idx > -1 ) {
      this.nonPrivilegedRoles[idx].checked = event.target.checked;
    }
  }

  getIndexById( id, listItems) {
    for ( const row of listItems ) {
      if ( row['id'] === id ) {
        return listItems.indexOf(row);
      }
    }
    return -1;
  }

  prepareUser() {
    this.initUserVo();
    this.populateForm();
  }

  populateForm() {
    let rt = '';
    const controlList = ['pwd', 'cpwd', 'roletype', 'loginName'];
    this.pdcList = [];

    if ( this.userVo.id < 1) {
      this.newUser = true;
      for ( let name of controlList ) {
        this.userForm.controls[name].enable();
      }
      rt = 'nonpriv';
    } else {
      this.newUser = false;
      for ( let name of controlList ) {
        this.userForm.controls[name].disable();
      }
      rt = (this.userVo.adminUser === true ? 'priv' : 'nonpriv');
    }
    this.orgUnitCode = {
      id: this.userVo.homeUnitVo.id,
      code: this.userVo.homeUnitVo.unitCode,
      desc: this.userVo.homeUnitVo.name,
      adddata: this.userVo.homeUnitVo.dispatchCenters
    }
    if(this.orgUnitCode.code === undefined){
      this.orgUnitCode.code = '';
      this.orgUnitCode.desc = '';
    }
    if(this.userVo.id > 0){
      this.userVo.homeUnitVo.dispatchCenters.forEach(pdc=> {
        this.pdcList.push({id: pdc.id, code: pdc.unitCode, desc: pdc.name});
      })
      const pdcIdx = this.getIndexById( this.userVo.primaryDispatchCenterVo['id'], this.pdcList);
      this.pdcUnitCode = this.pdcList[pdcIdx];
      this.userForm.setValue(
        {
          enabled: this.userVo.enabled
          , loginName: this.userVo.loginName
          , firstName: this.userVo.firstName
          , lastName: this.userVo.lastName
          , pwd: this.userVo.password
          , cpwd: this.userVo.password
          , email : this.userVo.email
          , workPhone: this.userVo.workPhone
          , cellPhone: this.userVo.cellPhone
          , id: this.userVo.id
          , homeUnitVo: this.orgUnitCode
          , pdcVo: this.pdcUnitCode
          , roletype: rt
        }
      );
    }
    this.rebuildRoles(rt);
  }

  onUnitChange(event) {
    this.pdcList = [];
    event.adddata.forEach(pdc=>{
      this.pdcList.push({id: pdc.id, code: pdc.unitCode, desc: pdc.name});
    });
    this.pdcUnitCode = this.pdcList[0];
    this.userForm.patchValue({pdcVo: this.pdcUnitCode})
  }

  save() {
    this.userVo.loginName = this.userForm.get('loginName').value;
    this.userVo.firstName = this.userForm.get('firstName').value;
    this.userVo.lastName = this.userForm.get('lastName').value;
    this.userVo.password = this.userForm.get('pwd').value;
    this.userVo.confirmPassword = this.userForm.get('cpwd').value;
    this.userVo.workPhone = this.userForm.get('workPhone').value;
    this.userVo.cellPhone = this.userForm.get('cellPhone').value;
    this.userVo.email = this.userForm.get('email').value;
    this.userVo.enabled = this.userForm.get('enabled').value;
    this.userVo.adminUser = this.userForm.get('roletype').value === 'priv';
    this.userVo.homeUnitVo = this.userForm.get('homeUnitVo').value as OrganizationVo;
    this.userVo.primaryDispatchCenterVo = this.userForm.get('pdcVo').value as OrganizationVo;
    this.userVo.userRoleVos = [];

    // console.log('pdcVo ' + JSON.stringify(this.userVo.primaryDispatchCenterVo));
    if ( this.userForm.get('roletype').value === 'priv' ) {
      this.privilegedRoles.filter(role => role['checked'] === true ).forEach(element => {
        const systemRoleVo: SystemRoleVo = <SystemRoleVo>{};
        systemRoleVo.id = element['id'];
        systemRoleVo.roleName = element['roleName'];
        systemRoleVo.displayName = element['displayName'];
        this.userVo.userRoleVos.push(systemRoleVo);
      });
    } else {
      this.nonPrivilegedRoles.filter(role => role['checked'] === true ).forEach(element => {
        const systemRoleVo: SystemRoleVo = <SystemRoleVo>{};
        systemRoleVo.id = element['id'];
        systemRoleVo.roleName = element['roleName'];
        systemRoleVo.displayName = element['displayName'];
        this.userVo.userRoleVos.push(systemRoleVo);
      });
    }

    // TODO: set db name from systemService
    // this.userVo.dbname = 'dollarridge';
    this.userVo.dbname  = this.systemService.userSessionVo['siteDatabaseName'];
    // console.log('dbname ' + this.systemService.userSessionVo['siteDatabaseName']);
    this.userService.saveUser(this.userVo)
      .subscribe(data => {
        this.nofityService.inspectResult(data);
        this.saveEvent.emit(data['resultObjectAlternate']);
      });

      //this.saveEvent.emit('');
  }

  cancel() {
    this.cancelEvent.emit('');
  }

  resetPassword() {
    this.userForm.get('pwd').enable();
    this.userForm.get('cpwd').enable();
    this.userForm.get('pwd').patchValue('');
    this.userForm.get('cpwd').patchValue('');
  }

  onChangeRoleType(event) {
    if ( this.newUser === true && event.target.value === 'priv') {
      // default starting login name with ad.
      const lname = this.userForm.get('loginName').value as string;
      if ( lname.startsWith('ad.') === false) {
        this.userForm.get('loginName').setValue('ad.');
      }
    }
    if ( this.newUser === true && event.target.value === 'nonpriv') {
      // remove starting login name with ad.
      const lname = this.userForm.get('loginName').value as string;
      if ( lname.startsWith('ad.') ) {
        this.userForm.get('loginName').setValue('');
      }
      // unselect all roles by default
      this.nonPrivilegedRoles.forEach( function (row, index) { row.checked = false; });
    }
  }

  selectAllNonPrivRoles() {
    this.nonPrivilegedRoles.forEach( function (row, index) { row.checked = true; });
  }

  unSelectAllNonPrivRoles() {
    this.nonPrivilegedRoles.forEach( function (row, index) { row.checked = false; });
  }
}
