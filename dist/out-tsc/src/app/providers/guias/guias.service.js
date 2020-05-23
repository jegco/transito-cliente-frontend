import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { concatAll } from 'rxjs/operators';
let GuiasService = class GuiasService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/guias';
        this.buscarGuiasPorTipo = (tipo) => {
            return this.http.get(this.url).pipe(concatAll());
        };
        this.buscarGuias = (param) => {
            return param !== 'todos' ? this.http.getResource(this.url, param, param, param)
                : this.http.get(this.url);
        };
        this.buscarGuiaPorTitulo = (titulo) => {
            return this.http.getResource(`${this.url}/titulo`, titulo).pipe(concatAll());
        };
    }
};
GuiasService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GuiasService);
export { GuiasService };
//# sourceMappingURL=guias.service.js.map