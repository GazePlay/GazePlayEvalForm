import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-alert',
  templateUrl: './home-alert.component.html',
  styleUrls: ['./home-alert.component.css']
})
export class HomeAlertComponent {

  constructor(private router: Router) {
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
