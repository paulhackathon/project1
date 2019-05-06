import { Component, OnInit } from '@angular/core';
import { DropdownData } from '../../../../../data/dropdowndata';

@Component({
  selector: 'app-inc-info',
  templateUrl: './inc-info.component.html',
  styleUrls: ['./inc-info.component.css']
})
export class IncInfoComponent implements OnInit {
  public states: DropdownData[] = [];
  public eventType: DropdownData[] = [];
  public incJur: DropdownData[] = []
  
  constructor() { }
  ngOnInit() {
    for(let i = 0; i<10000;i++ ){
      this.incJur.push({id: i, code: i.toString(), desc: i.toString()});
    }

    this.states.push(
      {id: 0,code: 'AL', desc: 'Alabama'},
      {id: 1,code: 'AK', desc: 'Alaska'},
      {id: 2,code: 'AZ', desc: 'Arizona'},
      {id: 3,code: 'AR', desc: 'Arkansas'},
      {id: 4,code: 'CA', desc: 'California'},
      {id: 5,code: 'CO', desc: 'Colorado'},
      {id: 6,code: 'CT', desc: 'Connecticut'},
      {id: 7,code: 'DE', desc: 'Delaware'},
      {id: 8,code: 'FL', desc: 'Florida'},
      {id: 9,code: 'GA', desc: 'Georgia'},
      {id: 10,code: 'HI', desc: 'Hawaii'},
      {id: 11,code: 'ID', desc: 'Idaho'},
      {id: 12,code: 'IL', desc: 'Illinois'},
      {id: 13,code: 'IN', desc: 'Indiana'},
      {id: 14,code: 'IA', desc: 'Iowa'},
      {id: 15,code: 'KS', desc: 'Kansas'},
      {id: 16,code: 'KY', desc: 'Kentucky'},
      {id: 17,code: 'LA', desc: 'Louisiana'},
      {id: 18,code: 'ME', desc: 'Maine'},
      {id: 19,code: 'MD', desc: 'Maryland'},
      {id: 20,code: 'MA', desc: 'Massachusetts'},
      {id: 21,code: 'MI', desc: 'Michigan'},
      {id: 22,code: 'MN', desc: 'Minnesota'},
      {id: 23,code: 'MS', desc: 'Mississippi'},
      {id: 24,code: 'MO', desc: 'Missouri'},
      {id: 25,code: 'MT', desc: 'Montana'},
      {id: 26,code: 'NE', desc: 'Nebraska'},
      {id: 27,code: 'NV', desc: 'Nevada'},
      {id: 28,code: 'NH', desc: 'New Hampshire'}, 
      {id: 29,code: 'NJ', desc: 'New Jersey'}, 
      {id: 30,code: 'NM', desc: 'New Mexico'}, 
      {id: 31,code: 'NY', desc: 'New York'}, 
      {id: 32,code: 'NC', desc: 'North Carolina'}, 
      {id: 33,code: 'ND', desc: 'North Dakota'}, 
      {id: 34,code: 'OH', desc: 'Ohio'},
      {id: 35,code: 'OK', desc: 'Oklahoma'},
      {id: 36,code: 'OR', desc: 'Oregon'},
      {id: 37,code: 'PA', desc: 'Pennsylvania'},
      {id: 38,code: 'RI', desc: 'Rhode Island'}, 
      {id: 39,code: 'SC', desc: 'South Carolina'}, 
      {id: 40,code: 'SD', desc: 'South Dakota'}, 
      {id: 41,code: 'TN', desc: 'Tennessee'},
      {id: 42,code: 'TX', desc: 'Texas'},
      {id: 43,code: 'UT', desc: 'Utah'},
      {id: 44,code: 'VT', desc: 'Vermont'},
      {id: 45,code: 'VA', desc: 'Virginia'},
      {id: 46,code: 'WA', desc: 'Washington'},
      {id: 47,code: 'WV', desc: 'West Virginia'}, 
      {id: 48,code: 'WI', desc: 'Wisconsin'},
      {id: 49,code: 'WY', desc: 'Wyoming'}
    )
    this.eventType.push(
      {id: 0,code:'ABC', desc:'Alphabet'},
      {id: 1,code:'1', desc:'Alphabet1'},
      {id: 2,code:'2', desc:'Alphabet2'},
      {id: 3,code:'3', desc:'Alphabet3'}
    )
    // this.incJur.push(
    //   {code:'5', desc:'inc005'},
    //   {code:'6', desc:'inc006'},
    //   {code:'7', desc:'inc007'}
    // )
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
