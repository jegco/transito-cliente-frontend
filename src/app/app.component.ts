import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TiposService } from './providers/tipos/tipos.service';
import { PreferenciasService } from './providers/preferencias/preferencias.service';
import { Observable } from 'rxjs';
import { Tipo } from './models/Tipo';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'transito-cliente';
  searchValue = '';
  displaySearch = false;
  tipos$: Observable<Tipo>;

  constructor(private readonly router: Router,
    private readonly tiposService: TiposService,
    private readonly preferenciasService: PreferenciasService) {}

  ngOnInit() {
    this.tipos$ = this.tiposService.buscarTipos();
    this.preferenciasService.buscarPreferencias().subscribe();
    this.router.events.pipe(
    filter(event => event instanceof NavigationStart))
    .subscribe((event:NavigationStart) => {
      this.displaySearch = event.url !== '/';
    });
  }

  navigate = () => {
    this.router.navigateByUrl(`/search/${this.searchValue}`)
  }
}
