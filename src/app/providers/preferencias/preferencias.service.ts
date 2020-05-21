import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PreferenciasDeUsuario } from 'src/app/models/PreferenciasDeUsuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreferenciasService {

  url: string = ENV.serverUrl + '/preferencias';

  constructor(private readonly http: HttpService) { }

  buscarPreferencias = (): Observable<PreferenciasDeUsuario> => {
    return this.http.get<PreferenciasDeUsuario>(this.url)
    .pipe(
      tap(preferencias => {
        debugger;
        localStorage.setItem('nombreAnimacion', preferencias.animacion.nombre);
        localStorage.setItem('tiempoEspera', preferencias.animacion.tiempoDeEspera + '');
        localStorage.setItem('tiempoAnimacion', preferencias.animacion.tiempoDeAnimacion + '');
        localStorage.setItem('colorPrimario', preferencias.colorPrimario);
        localStorage.setItem('colorSecundario', preferencias.colorSecundario);
      })
    );
  }
}
