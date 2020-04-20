import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiposService } from './providers/tipos/tipos.service';
import { Observable } from 'rxjs';
import { Tipo } from './models/Tipo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'transito-cliente';
  searchValue = '';
  tipos$: Observable<Tipo>;

  constructor(private readonly router: Router,
    private readonly tiposService: TiposService) {}

  ngOnInit() {
    this.tipos$ = this.tiposService.buscarTipos();
  }

  navigate = () => {
    this.router.navigateByUrl(`/search/${this.searchValue}`)
  }
}
