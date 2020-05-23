import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
let AppComponent = class AppComponent {
    constructor(router, preferenciasService) {
        this.router = router;
        this.preferenciasService = preferenciasService;
        this.title = 'transito-cliente';
        this.searchValue = '';
        this.displaySearch = false;
        this.navigate = () => {
            this.router.navigateByUrl(`/search/${this.searchValue}`);
        };
    }
    ngOnInit() {
        this.preferenciasService.buscarPreferencias().subscribe();
        this.router.events.pipe(filter(event => event instanceof NavigationStart))
            .subscribe((event) => {
            this.displaySearch = event.url !== '/';
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map