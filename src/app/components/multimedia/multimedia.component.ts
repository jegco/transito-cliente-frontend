import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Documento } from 'src/app/models/Documento';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';

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

  constructor(private readonly documentosService: DocumentosService) { }

  showModal = () => {
    this.modalRef.nativeElement.style.display = 'block';
  }

  closeModal = () => {
    this.modalRef.nativeElement.style.display = 'none';
  }

  descargarArchivo = (documento: Documento): void => {
    debugger;
    this.documentosService.descargarDocumento(documento).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documento.nombre;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(() => {
          window.open(url);
          link.remove();
        }, 100);
      });
  }

}
