import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { keyframes as kf } from '../../animations/keyframes';
import { MatButton } from '@angular/material';
import { trigger, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('animacion', [
      transition('* => swing', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.swing)), { params: { delay: 10, time: 1000 } }),
      transition('* => bounce', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.bounce)), { params: { delay: 10, time: 1000 } }),
      transition('* => scale', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.scale)), { params: { delay: 10, time: 1000 } }),
      transition('* => translate', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.translate)), { params: { delay: 10, time: 1000 } })
    ])
  ]
})
export class SearchComponent extends BaseComponent {

  searchValue = '';
  colorPrimario = '';
  tiempoDeEspera;
  animacion;
  tiempoDeAnimacion;

  @ViewChild('searchBtn', {static: false})
  searchBtn: MatButton;

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService) {
    super(router, errorService, toast);
    this.colorPrimario = localStorage.getItem('colorPrimario');
    this.tiempoDeEspera = localStorage.getItem('tiempoEspera');
    this.tiempoDeAnimacion = localStorage.getItem('tiempoAnimacion');
    this.animacion = localStorage.getItem('nombreAnimacion');
  }

  search(): void {
    if (this.searchValue === '') {
      this.searchValue = 'todos';
    }
    this.openPage(`/search/${this.searchValue}`);
  }

}
