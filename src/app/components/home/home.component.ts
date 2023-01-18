import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  orderProgress: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "position: absolute; visibility: hidden";
  }

  start(){
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    this.router.navigate(['/informations']);
  }
}
