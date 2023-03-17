import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  openModalWithNavbarTitle: boolean = false;
  openModalWithNavbarTitleObservable = new Subject<boolean>();

  constructor() { }

  openModal(value: boolean){
    this.openModalWithNavbarTitle = value;
    this.openModalWithNavbarTitleObservable.next(value);
  }
}
