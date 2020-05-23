import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../pages/search/search.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { DetailsComponent } from '../pages/details/details.component';
const routes = [
    { path: 'search/:searchParam', component: DashboardComponent },
    { path: 'details/:nombreGuia', component: DetailsComponent },
    { path: '', component: SearchComponent },
    { path: '**', redirectTo: '' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map