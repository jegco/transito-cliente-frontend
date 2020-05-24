import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiasService } from 'src/app/providers/guias/guias.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent {

  searchValue = '';

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService) {
    super(router, errorService, toast);
  }

  search(): void {
    if (this.searchValue === '') {
      this.searchValue = 'todos';
    }
    this.openPage(`/search/${this.searchValue}`);
  }

}
