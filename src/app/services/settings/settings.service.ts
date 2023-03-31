import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  openModalWithNavbarTitle: boolean = false;
  openModalWithNavbarTitleObservable = new Subject<boolean>();

  deleteElemWhitModalObservable = new Subject<boolean>();

  infoAlert: any;
  titleInfoAlertMessage: string = " Sauvegarde";
  contentInfoAlertMessage: string = "Une sauvegarde automatique a été effectuer !";
  delayForCloseInfoAlert: any = setTimeout;
  timeForMessageInfoAlert = 10000; // c'est en millisecondes
  messageInfoAlertObservable = new Subject<string[]>();

  constructor() { }

  openModal(value: boolean){
    this.openModalWithNavbarTitle = value;
    this.openModalWithNavbarTitleObservable.next(value);
  }

  deleteElemWithModal(value: boolean){
    this.deleteElemWhitModalObservable.next(value);
  }

  changeMessageInfoAlert(title: string, content: string){
    this.messageInfoAlertObservable.next([title, content]);
  }

  saveAuto(){
    clearTimeout(this.delayForCloseInfoAlert);
    this.changeMessageInfoAlert(this.titleInfoAlertMessage, this.contentInfoAlertMessage);
    this.infoAlert = document.getElementById("infoAlert");
    this.infoAlert.style = "display: block !important";
    this.delayForCloseInfoAlert = setTimeout(() => {
      this.infoAlert.style = "display: none !important";
    }, this.timeForMessageInfoAlert);
  }
}
