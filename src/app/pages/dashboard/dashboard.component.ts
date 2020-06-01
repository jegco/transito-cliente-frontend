import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiasService } from 'src/app/providers/guias/guias.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Observable, of } from 'rxjs';
import { TiposService } from 'src/app/providers/tipos/tipos.service';
import { Tipo } from 'src/app/models/Tipo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  guias$: Observable<GuiaDeTramite | GuiaDeTramite[]>;
  tipos$: Observable<Tipo[]>;
  showSpinner = false;
  searchValue = '';

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService,
              private readonly guiasService: GuiasService,
              private readonly tiposService: TiposService,
              private activatedRoute: ActivatedRoute) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.guias$ = this.activatedRoute.params.pipe(
      map(params => params.searchParam),
      switchMap(searchParam => this.guiasService.buscarGuias(searchParam)),
      catchError(error => {
        this.handleException(error);
        return of<GuiaDeTramite>();
      }));

    this.tipos$ = this.tiposService.buscarTipos();
  }

  showDetails($event: GuiaDeTramite) {
    this.openPage(`/details/${$event.titulo}`, { guia: $event });
  }

  search = () => {}

}
