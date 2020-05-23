import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent{

  @Input()
  anexo: Documento;

  @ViewChild('modal', {static: false})
  modalRef: ElementRef;

  constructor() { }

  showModal = () => {
    this.modalRef.nativeElement.style.display = 'block';
  }

  closeModal = () => {
    this.modalRef.nativeElement.style.display = 'none';
  }

}
