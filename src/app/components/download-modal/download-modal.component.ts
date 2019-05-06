import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/service/modal-service';
@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.css']
})
export class DownloadModalComponent implements OnInit {
  promptTitle = 'Download File';

  button1Label = 'Save';
  button2Label = 'Cancel';
  

  @Output() downloadEvent = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.modalService.open('download-modal');
  }

  closeModal() {
    this.modalService.close('download-modal');
  }

  buttonClick(fileName) {
    this.downloadEvent.emit(fileName);
  }
}
