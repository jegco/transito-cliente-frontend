import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsModule } from './errors/errors.module';
import { HttpErrorInterceptor } from './errors/services/http-error-interceptor';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatButtonModule, MatCardModule, MatInputModule, MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatExpansionModule, MatDividerModule, MatSelectModule } from '@angular/material';
import { BaseComponent } from './pages/base/base.component';
import { GuiaItemComponent } from './components/guia-item/guia-item.component';
import { ToastrModule } from 'ngx-toastr';
import { PasoComponent } from './components/paso/paso.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            SearchComponent,
            DetailsComponent,
            DashboardComponent,
            BaseComponent,
            GuiaItemComponent,
            PasoComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            ErrorsModule,
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            MatToolbarModule,
            MatIconModule,
            NgImageSliderModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            MatExpansionModule,
            MatSelectModule,
            MatTableModule,
            ToastrModule,
            MatDividerModule
        ],
        providers: [{
                provide: HTTP_INTERCEPTORS,
                useClass: HttpErrorInterceptor,
                multi: true
            }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map