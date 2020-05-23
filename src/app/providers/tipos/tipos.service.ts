import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpService } from '../base/http.service';
import { Tipo } from 'src/app/models/Tipo';
import { Observable } from 'rxjs';
import { concatAll } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TiposService {

  url: string = ENV.serverUrl + '/tipos';

  constructor(private readonly http: HttpService) { }

  buscarTipos = (): Observable<Tipo[]> => {
    return this.http.get<Tipo[]>(this.url);
  }
}
