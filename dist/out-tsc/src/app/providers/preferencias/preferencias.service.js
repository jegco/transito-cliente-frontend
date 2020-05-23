import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
let PreferenciasService = class PreferenciasService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/preferencias';
        this.buscarPreferencias = () => {
            return this.http.get(this.url)
                .pipe(tap(preferencias => {
                localStorage.setItem('nombreAnimacion', preferencias.animacion.nombre);
                localStorage.setItem('tiempoEspera', preferencias.animacion.tiempoDeEspera + '');
                localStorage.setItem('tiempoAnimacion', preferencias.animacion.tiempoDeAnimacion + '');
                localStorage.setItem('colorPrimario', preferencias.colorPrimario);
                localStorage.setItem('colorSecundario', preferencias.colorSecundario);
            }));
        };
    }
};
PreferenciasService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PreferenciasService);
export { PreferenciasService };
//# sourceMappingURL=preferencias.service.js.map