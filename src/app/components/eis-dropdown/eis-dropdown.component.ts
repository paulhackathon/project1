import {
  Component, OnInit, Input,
  Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownData } from '../../data/dropdowndata';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-eis-dropdown',
  templateUrl: './eis-dropdown.component.html',
  styleUrls: ['./eis-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EisDropdownComponent),
      multi: true
    }
  ]
})
export class EisDropdownComponent implements ControlValueAccessor, OnInit {
  @Input() dropdownData: DropdownData[];
  @Input() dropdownDisabled: boolean = false;
  @Input() selectedDropdownData: DropdownData;
  @Output() dropdownSelect = new EventEmitter();
  @ViewChild(CdkVirtualScrollViewport) dropdownViewportDiv: CdkVirtualScrollViewport;
  @Input() id;
  @Input() width: number;

  onChange: any = () => { };
  onTouched: any = () => { };

  selectedValue: DropdownData = {id: 0,code:'',desc:''};
  filterString: string = '';
  filteredData: DropdownData[];
  dropdownVisible: boolean = false;
  inputSelected: boolean = false;
  activeItem: number;
  activeItemStr: DropdownData[] = [];
  activeData = '';

  constructor() { }

  ngOnInit() {
    this.inputSelected;
    this.filteredData = this.dropdownData;
  }

  ngOnChanges() {
    if(this.selectedDropdownData){
      this.selectedValue = this.selectedDropdownData;
      for (let i in this.dropdownData){
        if(this.selectedDropdownData.code == this.dropdownData[i].code){
          this.activeItem = parseInt(i);
        }
      }
    }
  }
  inputBlur(event) {
    if ( this.activeItem === -1 ) {
      this.selectedValue.id = -1;
      this.selectedValue.code = '';
      event.target.value = this.selectedValue.code;
      this.value = this.selectedValue;
    }

    if (this.inputSelected) {
      this.inputSelected = false;
      return;
    }
    this.dropdownVisible = false;
  }
  inputFocus() {
    this.dropdownVisible = true;
  }

  inputChange(data) {
    this.activeData = data;
    this.activeItemStr = [];
    this.dropdownData.forEach(item => {
      if (item.code.toLowerCase().indexOf(data.toLowerCase()) > -1) //Compare by code
      // || item.desc.toLowerCase().indexOf(data.toLowerCase()) > -1) //Compare by description
      {
        this.activeItemStr.push({id: item.id, code: item.code, desc: item.desc })
      }
      else{
        this.activeItem = -1;
      }
    });

    for (let i = 0; i < this.dropdownData.length; i++) {
      if (this.activeItemStr.length > 0 && this.activeItemStr[0].code == this.dropdownData[i].code) {
        this.activeItem = i;
        this.activeData = this.dropdownData[i].code;
        this.dropdownViewportDiv.scrollToIndex(this.activeItem);
      }
    }
  }
  keyboardEvent(event) {
    if (this.dropdownVisible) {
      switch (event.which) {
        case 13:
          this.selectItem(this.dropdownData[this.activeItem], this.activeItem);
          break;
        case 38:
          this.selectPrevItem();
          break;
        case 40:
          this.selectNextItem();
          break;
      }
    }
    else {
      // allow tab to move to next field
      if ( event.which !== 9 ) {
        this.dropdownVisible = true;
      }
    }
  }
  selectItem(item, index) {
    this.inputSelected = true;
    this.activeItem = index;
    this.selectedValue = item;
    this.activeData = item.code;
    this.dropdownVisible = false;
    this.dropdownSelect.emit(this.selectedValue);
    this.writeValue(this.selectedValue);
  }
  selectPrevItem() {
    if (!this.activeItem) {
      this.activeItem = 0;
    }
    if (this.activeItem > 0) {
      this.activeItem--;
      this.dropdownViewportDiv.scrollToIndex(this.activeItem - 1)
      this.selectedValue = this.dropdownData[this.activeItem];
    }
  }
  selectNextItem() {
    if (!this.activeItem) {
      this.activeItem = 0;
    }
    if (this.activeItem < this.dropdownData.length - 1) {
      this.dropdownViewportDiv.scrollToIndex(this.activeItem++);
      this.selectedValue = this.dropdownData[this.activeItem];
    }
  }

  //ControlValueAccessor Functions
  get value() {
    return this.selectedValue;
  }

  set value(val) {
    console.log('in set value ' + JSON.stringify(val));
    this.selectedValue = val;
    this.onChange(val);
    this.onTouched();
  }


  writeValue(value) {
    if (value) {
      this.value = value;
    } else {
      this.value = {id: 0, code: '', desc: ''};
    }
  }

  registerOnChange(fn) { this.onChange = fn;  }

  registerOnTouched(fn) { }
}
