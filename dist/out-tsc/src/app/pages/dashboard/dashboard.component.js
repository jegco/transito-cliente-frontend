import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
let DashboardComponent = class DashboardComponent extends BaseComponent {
    constructor(router, errorService, toast, guiasService, tiposService, activatedRoute) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.guiasService = guiasService;
        this.tiposService = tiposService;
        this.activatedRoute = activatedRoute;
        this.showSpinner = false;
    }
    ngOnInit() {
        this.guias$ = this.activatedRoute.params.pipe(map(params => params.searchParam), switchMap(searchParam => this.guiasService.buscarGuias(searchParam)), catchError(error => {
            this.handleException(error);
            return of();
        }));
        this.tipos$ = this.tiposService.buscarTipos();
    }
    showDetails($event) {
        this.openPage(`/details/${$event.titulo}`, { guia: $event });
    }
};
DashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map