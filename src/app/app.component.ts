import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PreferenciasService } from './providers/preferencias/preferencias.service';
import { Observable } from 'rxjs';
import { Tipo } from './models/Tipo';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'transito-cliente';
  searchValue = '';
  displaySearch = false;
  tipos$: Observable<Tipo>;

  @ViewChild('toolbar', { static: false })
  toolbarRef: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly preferenciasService: PreferenciasService,
    private readonly renderer: Renderer2) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.displaySearch = event.url !== '/';
      });
  }

  ngAfterViewInit() {
    this.preferenciasService.buscarPreferencias().subscribe(() => {
      if (this.toolbarRef) {
        this.renderer.setStyle(this.toolbarRef._elementRef.nativeElement, 'background-color', localStorage.getItem('colorPrimario'));
      }
    }
    );
  }

  navigate = () => {
    this.router.navigateByUrl(`/search/${this.searchValue}`);
  }
}
