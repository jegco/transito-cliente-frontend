import { Component, OnInit, Input } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paso',
  templateUrl: './paso.component.html',
  styleUrls: ['./paso.component.css']
})
export class PasoComponent {

  @Input()
  paso: Paso;

  @Input()
  index: number;

  constructor(private readonly sanitizer: DomSanitizer) { }

  descripcionComoHTML = (paso: Paso) => {
    return this.sanitizer.bypassSecurityTrustHtml(paso.descripcion);
  }

}
