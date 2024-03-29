import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
let DetailsComponent = class DetailsComponent extends BaseComponent {
    constructor(router, errorService, toast, activatedRoute, guiasService, documentosService, sanitizer) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.activatedRoute = activatedRoute;
        this.guiasService = guiasService;
        this.documentosService = documentosService;
        this.sanitizer = sanitizer;
        this.descripcion = {};
        this.descripcionComoHTML = (guia) => {
            // this.añadirMarcador(guia.puntosDeAtencion);
            return this.sanitizer.bypassSecurityTrustHtml(guia.descripcion);
        };
        this.añadirMarcador = (puntos) => {
            puntos.forEach(punto => {
                this.map.addObject(new H.map.Marker({
                    lat: punto.latitud,
                    lng: punto.longitud
                }));
            });
            // const informacion = this.construirformacionDelMarcador(latitud, longitud);
            // ui.addBubble(informacion);
        };
        this.descargarArchivo = (documento) => {
            this.documentosService.descargarDocumento(documento).subscribe(data => {
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
            }, error => this.handleException(error));
        };
        this.platform = new H.service.Platform({
            apikey: 'BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw'
        });
    }
    ngOnInit() {
        this.mapRendered = of(false);
        this.guia$ = this.activatedRoute.params
            .pipe(map(params => params.nombreGuia), switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)), catchError(error => {
            this.handleException(error);
            return of();
        }));
    }
    ngDoCheck() {
        if (this.mapElement.nativeElement.classList.contains('open')) {
            this.initMap();
        }
    }
    ngAfterViewInit() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(this.mapElement.nativeElement, defaultLayers.vector.normal.map, {
            zoom: 14,
            center: { lat: 10.406887, lng: -75.516103 }
        });
        const mapEvents = new H.mapevents.MapEvents(this.map);
        this.map.getViewPort().resize();
        // Instantiate the default behavior, providing the mapEvents object:
        const behavior = new H.mapevents.Behavior(mapEvents);
        const ui = H.ui.UI.createDefault(this.map, defaultLayers);
    }
};
tslib_1.__decorate([
    ViewChild('map', { static: false })
], DetailsComponent.prototype, "mapElement", void 0);
DetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-details',
        templateUrl: './details.component.html',
        styleUrls: ['./details.component.css']
    })
], DetailsComponent);
export { DetailsComponent };
//# sourceMappingURL=details.component.js.map