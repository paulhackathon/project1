import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-eis-datepicker',
  templateUrl: './eis-datepicker.component.html',
  styleUrls: ['./eis-datepicker.component.css'],
providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EisDatepickerComponent),
      multi: true
    }
  ]
})
export class EisDatepickerComponent implements OnInit {
  ngOnInit(){

  }

  setDate(event){
    const dayInput = (<HTMLInputElement> document.getElementById(event.path[0].id))
    let date = new Date(dayInput.value);
    
    if(event.key == '+'){
      date.setUTCDate(date.getUTCDate() + 1);
      dayInput.valueAsDate = date;
    } 
    else if(event.key == '-'){
      date.setUTCDate(date.getUTCDate() - 1);
      dayInput.valueAsDate = date;
    }
  }
}
