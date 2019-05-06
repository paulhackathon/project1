import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, MaxLengthValidator } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() id;
  @Input() name;
  @Input() type;
  @Input() restrict2 = '';
  @Input() allowSpace = false;
  @Input() maxlength = 0;
  @Input() width: number;
  @Input() textTransform = 'uppercase';
  @Input('value') formattedValue = '';
  @Input() disabled = false;
  rawValue;
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
  }

  onBlur(event) {
    this.formattedValue = event.srcElement.value;
    this.writeValue(this.formattedValue);
  }

  keyboardEvent(event) {
//    console.log(event);
    if ( this.maxlength > 0 ) {
//      console.log(this.value.length);
      if ( (event.srcElement.value.length + 1 ) > this.maxlength ) {
        return false;
      }
    }

    let rtn: any = false;
    if(this.restrict2 === undefined || this.restrict2 === '') {
      rtn = event.which;
    }
    const splitValue = this.restrict2.split(',', 10);
    splitValue.forEach(r => {
      switch (r) {
        case 'a-z':
          if ( event.which > 96 && event.which < 123) { rtn = event.which; }
          break;
        case 'A-Z':
          if ( event.which > 64 && event.which < 91) { rtn = event.which; }
          break;
        case '0-9':
          if ( event.which > 47 && event.which < 58) { rtn = event.which; }
          break;
        case '-':
          if ( event.which === 45 ) { rtn = event.which; }
          break;
        case '_':
          if ( event.which === 95 ) { rtn = event.which; }
          break;
      }
    });
    // inspect if spacebar was pressed
    if (event.which === 32 ) { rtn = (this.allowSpace === true ? event.which : false); }

    return rtn;
  }

  get value() {
    return this.formattedValue;
  }

  set value(val) {
    this.rawValue = val;
    this.formattedValue = val;
    this.onChange(val);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // This is a basic setter that the forms API is going to use
  writeValue(value) {
    if (value) {
      this.value = value;
    } else {
      this.value = '';
    }
  }
}
