import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-choose-sound',
  templateUrl: './choose-sound.component.html',
  styleUrls: ['./choose-sound.component.css']
})
export class ChooseSoundComponent {

  constructor(
    private dialogRef: MatDialogRef<ChooseSoundComponent>) {
  }

  close(){
    this.dialogRef.close();
  }
}
