import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-secoond-nav',
  templateUrl: './secoond-nav.component.html',
  styleUrls: ['./secoond-nav.component.scss']
})
export class SecoondNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
