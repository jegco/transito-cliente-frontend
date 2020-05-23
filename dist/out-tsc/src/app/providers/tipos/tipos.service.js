import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
let TiposService = class TiposService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/tipos';
        this.buscarTipos = () => {
            return this.http.get(this.url);
        };
    }
};
TiposService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TiposService);
export { TiposService };
//# sourceMappingURL=tipos.service.js.map