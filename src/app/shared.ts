import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ModalComponent } from 'src/app/components/modal/modal-component';
import { PromptModalComponent } from './components/prompt-modal/prompt-modal.component';
import { DownloadModalComponent } from './components/download-modal/download-modal.component';
import { EisDropdownComponent } from 'src/app/components/eis-dropdown/eis-dropdown.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhoneInputComponent } from 'src/app/components/phone-input/phone-input.component';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { EisDatepickerComponent } from 'src/app/components/eis-datepicker/eis-datepicker.component';
import { EisGridComponent } from 'src/app/components/eis-grid/eis-grid.component';
import { GridIconBarComponent } from 'src/app/components/grid-icon-bar/grid-icon-bar.component';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';

 @NgModule({
 imports: [
    CommonModule,
    AgGridModule.withComponents(null),
    ScrollingModule
   ],
 declarations: [
    ModalComponent,
    PromptModalComponent,
    DownloadModalComponent,
    EisDropdownComponent,
    PhoneInputComponent,
    EisDatepickerComponent,
    EisGridComponent,
    PhonePipe,
    GridIconBarComponent,
    TextInputComponent,
 ],
 exports: [
    ModalComponent,
    PromptModalComponent,
    DownloadModalComponent,
    EisDropdownComponent,
    PhoneInputComponent,
    EisDatepickerComponent,
    EisGridComponent,
    PhonePipe,
    GridIconBarComponent,
    TextInputComponent,
 ],
 providers: [
 ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
