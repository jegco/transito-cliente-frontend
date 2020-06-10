import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiasService } from 'src/app/providers/guias/guias.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { keyframes as kf } from '../../animations/keyframes';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Observable, of } from 'rxjs';
import { TiposService } from 'src/app/providers/tipos/tipos.service';
import { Tipo } from 'src/app/models/Tipo';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('animacion', [
      transition('* => swing', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.swing)), { params: { delay: 10, time: 1000 } }),
      transition('* => bounce', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.bounce)), { params: { delay: 10, time: 1000 } }),
      transition('* => scale', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.scale)), { params: { delay: 10, time: 1000 } }),
      transition('* => translate', animate('{{time}}ms {{delay}}s ease-in', keyframes(kf.translate)), { params: { delay: 10, time: 1000 } })
    ])
  ]
})
export class DashboardComponent extends BaseComponent implements OnInit {

  guias$: Observable<GuiaDeTramite | GuiaDeTramite[]>;
  tipos$: Observable<Tipo[]>;
  colorPrimario;
  colorSecundario;
  showSpinner = true;
  hasError = false;
  searchValue = '';
  tiempoDeEspera;
  animacion;
  tiempoDeAnimacion;

  constructor(
    public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly guiasService: GuiasService,
    private readonly tiposService: TiposService,
    private activatedRoute: ActivatedRoute) {
    super(router, errorService, toast);
    this.colorPrimario = localStorage.getItem('colorPrimario');
    this.colorSecundario = localStorage.getItem('colorSecundario');
    this.tiempoDeEspera = localStorage.getItem('tiempoEspera');
    this.tiempoDeAnimacion = localStorage.getItem('tiempoAnimacion');
    this.animacion = localStorage.getItem('nombreAnimacion');
  }

  ngOnInit() {
    this.guias$ = this.activatedRoute.params.pipe(
      map(params => params.searchParam),
      switchMap(searchParam => this.guiasService.buscarGuias(searchParam)),
      map(guias => {
        guias.map(guia => {
          guia.tipo.icono.rutaDeDescarga = environment.serverUrl + '/documentos/resource/' + guia.tipo.icono.nombre;
          return guia;
        });
        return guias;
      }),
      catchError(error => {
        this.handleException(error);
        this.hasError = true;
        this.showSpinner = false;
        return of<GuiaDeTramite>();
      }));

    this.tipos$ = this.tiposService.buscarTipos();
  }

  showDetails($event: GuiaDeTramite) {
    this.openPage(`/details/${$event.titulo}`, { guia: $event });
  }

  search = () => {
    if (this.searchValue === '') {
      this.searchValue = 'todos';
    }
    this.guias$ = this.guiasService.buscarGuias(this.searchValue).pipe(
      map(guias => {
        guias.map(guia => {
          guia.tipo.icono.rutaDeDescarga = environment.serverUrl + '/documentos/resource/' + guia.tipo.icono.nombre;
          return guia;
        });
        return guias;
      }),
      catchError(error => {
        this.handleException(error);
        return of<GuiaDeTramite>();
      }));
  }

}
