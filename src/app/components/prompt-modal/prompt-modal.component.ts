import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/service/modal-service';
@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.css']
})
export class PromptModalComponent implements OnInit {
  @Input() promptTitle = '';
  @Input() promptMessage1 = '';
  @Input() promptMessage2 = '';
  @Input() promptMessage3 = '';
  @Input() promptMessage4 = '';
  @Input() promptMessage5 = '';

  @Input() button1Label = '';
  @Input() button2Label = '';
  @Input() button3Label = '';

  @Output() promptActionEvent = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.modalService.open('prompt-modal');
  }

  closeModal() {
    this.modalService.close('prompt-modal');
  }

  buttonClick(action) {
    this.promptActionEvent.emit(action);
  }

  reset() {
    this.promptTitle = '';
    this.promptMessage1 = '';
    this.promptMessage2 = '';
    this.promptMessage3 = '';
    this.promptMessage4 = '';
    this.promptMessage5 = '';
    this.button1Label = '';
    this.button2Label = '';
    this.button3Label = '';
  }
}
