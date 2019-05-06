import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-board-view',
  templateUrl: './message-board-view.component.html',
  styleUrls: ['./message-board-view.component.css']
})
export class MessageBoardViewComponent implements OnInit {
  
  content="<p class=ql-align-center><strong class=ql-size-large>WELCOME TO e-ISUITE!</strong></p>" +
  "<p><br></p>" +
  "<p><strong>On this Message Board, the ITSS or Account Manager will post helpful information concerning application updates, outages or other situations that may impact the availability of the system.</strong></p>" +
  "<p><br></p>" +
  "<p>Help is available by calling the Interagency Incident Helpdesk at <strong>1-866-224-7677.</strong></p>" +
  "<p><br></p>" +  
  "<p>Known issues are provided in a document available on the e-ISuite web page, as well as additional information about e-ISuite: <strong>https://famit.nwcg.gov/applications/eISuite.</strong></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p class=ql-align-center><strong>We welcome feedback on ways to improve e-ISuite.</strong></p>" +
  "<p><br></p>" +
  "<p class=ql-align-center><strong>Please continue to send comments and suggestions to the e-ISuite Suggestion Box: i-suite-suggestions@dms.nwcg.gov.</strong></p>" +
  "<p class=ql-align-center><strong>A Change Request form is available on the website above, under the Change Management link.</strong></p>" +
  "<p><br></p>" +
  "<p class=ql-align-center><strong>Information on the e-ISuite Suggestion Box will be available soon.</strong></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "<p><br></p>" +
  "";

  constructor() { 
    
   }

  ngOnInit() {
  }

}
