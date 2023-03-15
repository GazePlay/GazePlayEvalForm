import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  orderProgress: any;

  constructor(private router: Router) {
  }

  startEval() {
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    this.router.navigate(['/informations']);
  }
}
