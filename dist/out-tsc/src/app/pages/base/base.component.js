import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let BaseComponent = class BaseComponent {
    constructor(router, errorService, toast) {
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
    }
    openPage(routename, params) {
        if (params) {
            this.router.navigateByUrl(`${routename}`, params);
        }
        this.router.navigateByUrl(`${routename}`);
    }
    handleException(error) {
        const handledError = this.errorService.handleException(error);
        if (handledError.toastNotifiation) {
            this.toast.error(handledError.message);
        }
        else {
            this.errorMessage = handledError.message;
        }
    }
};
BaseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-base',
        templateUrl: './base.component.html',
        styleUrls: ['./base.component.sass']
    })
], BaseComponent);
export { BaseComponent };
//# sourceMappingURL=base.component.js.map