import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let GuiaItemComponent = class GuiaItemComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.details = new EventEmitter();
    }
    ngOnInit() {
    }
    showDetails() {
        this.details.emit(this.guia);
    }
    descripcionComoHTML(descripcion) {
        return this.sanitizer.bypassSecurityTrustHtml(descripcion);
    }
};
tslib_1.__decorate([
    Input()
], GuiaItemComponent.prototype, "guia", void 0);
tslib_1.__decorate([
    Output()
], GuiaItemComponent.prototype, "details", void 0);
GuiaItemComponent = tslib_1.__decorate([
    Component({
        selector: 'app-guia-item',
        templateUrl: './guia-item.component.html',
        styleUrls: ['./guia-item.component.css']
    })
], GuiaItemComponent);
export { GuiaItemComponent };
//# sourceMappingURL=guia-item.component.js.map