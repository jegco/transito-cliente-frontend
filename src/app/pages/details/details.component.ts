import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { GuiasService } from 'src/app/providers/guias/guias.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';
import { Documento } from 'src/app/models/Documento';
import { of, Observable } from 'rxjs';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';

declare var H: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit, AfterViewInit {

  guia$: Observable<GuiaDeTramite>;
  imagenes: Array<any>;
  archivos: Array<Documento>;
  videos: Array<any>;
  descripcion = {};
  platform: any;
  map: any;

  @ViewChild("map", { static: false })
  mapElement: ElementRef;

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private guiasService: GuiasService,
              private readonly documentosService: DocumentosService,
              private readonly sanitizer: DomSanitizer) {
    super(router, errorService, toast);
    this.platform = new H.service.Platform({
      "apikey": "BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw"
    });
  }

  ngOnInit() {
    this.guia$ = this.activatedRoute.params
    .pipe(
      map(params => params['nombreGuia']),
      switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)),
      tap(guia => this.obtenerMultimedia(guia.formularios)),
      catchError(error => {
        this.handleException(error);
        return of<GuiaDeTramite>();
      }));
  }

  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 14,
        center: { lat: 10.406887, lng: -75.516103 }
      }
    );
    const mapEvents = new H.mapevents.MapEvents(this.map);
    this.map.getViewPort().resize();

    // Instantiate the default behavior, providing the mapEvents object:
    const behavior = new H.mapevents.Behavior(mapEvents);

    const ui = H.ui.UI.createDefault(this.map, defaultLayers);
}

  descripcionComoHTML = (guia: GuiaDeTramite) => {
    this.añadirMarcador(guia.puntosDeAtencion);
    return this.sanitizer.bypassSecurityTrustHtml(guia.descripcion);
  }

  añadirMarcador = (puntos: PuntoAtencion[]): void => {
    puntos.forEach(punto => {
      this.map.addObject(new H.map.Marker({
        lat: punto.latitud,
        lng: punto.longitud
      }));
    })
  }

  obtenerMultimedia = (documentos: Documento[]) => {
    this.imagenes = this.obtenerImagenes(documentos);
    this.videos = this.obtenerVideos(documentos);
    this.archivos = this.obtenerArchivos(documentos);
  }

  obtenerImagenes = (documentos: Documento[]): Array<any> => {
    return documentos
      .filter(documento => documento.extension === 'jpg' || documento.extension === 'png')
      .map(documento => {
        return {
          image: documento.rutaDeDescarga,
          thumbImage: documento.rutaDeDescarga,
          alt: documento.nombre,
          title: documento.nombre
        }
      })
  }

  obtenerVideos = (documentos: Documento[]): Array<any> => {
    return documentos
      .filter(documento => documento.extension === 'mp4')
      .map(documento => {
        return {
          image: documento.rutaDeDescarga,
          thumbImage: documento.rutaDeDescarga,
          alt: documento.nombre,
          title: documento.nombre
        }
      });
  }

  obtenerArchivos = (documentos: Documento[]): Array<any> => {
    return this.archivos = documentos.filter(documento => documento.extension === 'pdf');
  }

  descargarArchivo = (documento: Documento): void => {
    this.documentosService.descargarDocumento(documento).subscribe(
      data => {
        const blob = new Blob([data], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documento.nombre;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            window.open(url);
            link.remove();
        }, 100);
      }, error => this.handleException(error));
  }

}
