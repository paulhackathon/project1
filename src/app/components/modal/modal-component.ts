import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../../service/modal-service';
    /*
    http://jasonwatmore.com/post/2018/05/25/angular-6-custom-modal-window-dialog-box
    */

@Component({
    selector: 'app-jw-modal',
    template:
        `<div class="jw-modal">
            <div class="jw-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="jw-modal-background"></div>`,
    styleUrls: ['./modal-component.css'],
    })

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        const modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
         document.body.appendChild(this.element);

         // close modal on background click
         /*
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });
        */
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);

        // changing how to remove element since element.remove() not supported in ie
        // this.element.remove();
        this.element.parentElement.removeChild(this.element);
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
