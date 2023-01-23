import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EvalJsonService} from "../../services/json/eval-json.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  orderProgress: any;

  constructor(private router: Router,
              private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "position: absolute; visibility: hidden";
    this.evalJsonService.resetJson();
  }

  start(){
    this.orderProgress.style = "";
    this.router.navigate(['/informations']);
  }
}
