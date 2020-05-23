import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
let SearchComponent = class SearchComponent extends BaseComponent {
    constructor(router, errorService, toast, guiasService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.guiasService = guiasService;
        this.searchValue = '';
    }
    search() {
        if (this.searchValue == '')
            this.searchValue = "todos";
        this.openPage(`/search/${this.searchValue}`);
    }
};
SearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map