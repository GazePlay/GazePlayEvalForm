import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import * as JSZip from "jszip";
import {EvalJsonService} from "../../services/json/eval-json.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import-eval',
  templateUrl: './import-eval.component.html',
  styleUrls: ['./import-eval.component.css']
})
export class ImportEvalComponent {

  orderProgress: any;

  unzipEval: any;
  unzipJson: any;
  unzipIndex: number = 0;

  nbItem: number = 0;
  nameEval: String = "";
  infoPatient: any[][] = [];
  output: String = "all";
  skillToEvaluate: String[][] = [];
  imgToDisplay: any[][][] = [];
  songToDisplay: any[][] = [];
  cols: number[] = [];
  rows: number[] = [];
  itemLength:  number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToZip: String[][] = [];
  randomizeImgPos: boolean[] = [];
  songPosition: String[] = [];

  startUnzip: boolean = false;
  onReading: boolean = false;
  onGettingInfo: boolean = false;

  uploadFilePercentage: number = 0;
  uploadFileStep: number = 0;
  uploadFileProgress: string = "width: 0%";

  dropZoneText: string = "Zone de Drag & Drop du dossier .zip !";

  constructor(private evalJsonService: EvalJsonService,
              private router: Router) {
  }

  dropFile(droppedFiles: NgxFileDropEntry[]){
    this.unzipIndex = 0;
    this.uploadFilePercentage = 0;
    this.uploadFileProgress = "width: 0%";

    for (const droppedFile of droppedFiles) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.startUnzip = true;
          this.unzipFile(file);
          setTimeout(() => {
            this.extractJson();
            this.getInfoPatient(0);
            this.nbItem = this.unzipJson.length - 1;
            this.uploadFileStep = 100 / this.nbItem;
            let startIndexInfo = 1;
            let intervalInfo = setInterval(() => {
              if (startIndexInfo == this.unzipJson.length){
                clearInterval(intervalInfo);
                setTimeout(() => {
                  this.setupZip();
                  //this.logAll();
                }, 2000);
              } else if (!this.onGettingInfo){
                this.onGettingInfo = true;
                this.imgToDisplay.push([]);
                this.imgToZip.push([]);
                this.getItems(startIndexInfo);
                startIndexInfo++;
                this.uploadFilePercentage += this.uploadFileStep;
                this.uploadFileProgress = "width: " + this.uploadFilePercentage + "%";
              }
            }, 1000);
          }, 5000)
        });
      }else {
        console.log("Nope")
      }
    }
  }

  async unzipFile(file: File) {
    const unzip = new JSZip();
    this.unzipEval = await unzip.loadAsync(file).then(function (zip) {
      const unzipFile: any[][] = [];
      zip.forEach(function (relativePath, file) {
        file.async('blob').then(function (fileData) {
          const zipToFile = new File([fileData], file.name);
          const reader = new FileReader();
          try {
            reader.readAsDataURL(zipToFile);
            reader.onload = () => {
              unzipFile.push([String(reader.result), zipToFile.name, zipToFile]);
            };
          } catch (e) {
            console.log("Error");
          }
        });
      });
      return unzipFile;
    });
  }

  extractJson(){
    this.unzipEval.forEach((item: any) => {
      if (item[1].includes(".json")){
        this.unzipJson = JSON.parse(atob(item[0].replace("data:application/octet-stream;base64,", "")));
      }
    });
  }

  extractSong(songName: any, songFile: any){
    const reader = new FileReader();
    try {
      reader.readAsDataURL(songFile);
      reader.onload = () => {
        let extractZipSong = reader.result;
        if (typeof extractZipSong === "string") {
          extractZipSong = extractZipSong.replace("data:application/octet-stream;", "data:audio/wav;");
          this.songToDisplay[this.unzipIndex][0] = songName;
          this.songToDisplay[this.unzipIndex][1] = extractZipSong;
          this.songToDisplay[this.unzipIndex][2] = songFile;
        }
      }
    }
    catch (e){
      console.log("Error audio file ! " + e);
    }
  }

  extractImage(imageName: any, imageFile: any){
    const reader = new FileReader();
    this.onReading = true;
    try {
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        let extractZipImg = reader.result;
        if (typeof extractZipImg === "string") {
          extractZipImg = extractZipImg.replace("data:application/octet-stream;", "data:image/png;");
          this.imgToZip[this.unzipIndex].push(imageName, imageFile);
          this.imgToDisplay[this.unzipIndex].push([extractZipImg, 0]);
        }
      }
      reader.onloadend = () => {
        this.onReading = false;
      };
    }
    catch (e){
      console.log("Error image file ! " + e)
    }
  }

  getInfoPatient(index: number){
    this.nameEval = this.unzipJson[index][0];
    this.output = this.unzipJson[index][1];
    this.infoPatient.push(this.unzipJson[index][2]);
  }

  getItems(index: number){
    let startIndexImg: number = 3;
    const endIndexImg = ((this.unzipJson[index][0] * this.unzipJson[index][1])+3);

    this.rows.push(this.unzipJson[index][0]);
    this.cols.push(this.unzipJson[index][1]);
    this.getSong(this.unzipJson[index][endIndexImg]);
    this.nbImgToSee.push(this.unzipJson[index][endIndexImg+1]);
    this.fixationLength.push(this.unzipJson[index][endIndexImg+2] / 1000);
    this.itemLength.push(this.unzipJson[index][endIndexImg+3] / 1000);
    this.randomizeImgPos.push(this.unzipJson[index][endIndexImg+4]);
    this.songPosition.push(this.unzipJson[index][endIndexImg+5])

    let intervalImg = setInterval(() => {
      if (startIndexImg == endIndexImg){
        this.unzipIndex++;
        this.onGettingInfo = false;
        clearInterval(intervalImg);
      } else if (!this.onReading){
        this.getImage(this.unzipJson[index][startIndexImg]);
        startIndexImg++;
      }
    }, 1000);
  }

  getSong(nameSong: string){
    this.songToDisplay.push(["","",""]);
    this.unzipEval.forEach((item: any) => {
      if (item[1].includes(nameSong) && nameSong != ""){
        this.extractSong(nameSong, item[2])
      }
    });
  }

  getImage(nameImage: string){
    if (nameImage == "") {
      this.imgToDisplay[this.unzipIndex].push(["assets/images/NeedImage.png", 0]);
      this.imgToZip[this.unzipIndex].push("", "");
    }else {
      this.unzipEval.forEach((item: any) => {
        if (item[1].includes(nameImage)){
          this.extractImage(nameImage, item[2])
        }
      });
    }
  }

  logAll(){
    setTimeout(()=> {
      console.log("Name Eval = " + this.nameEval);
      console.log("Output = " + this.output);
      console.log("Info patient = " + this.infoPatient);
      console.log("Skill To Evaluate = " + this.skillToEvaluate);
      console.log("Rows = " + this.rows);
      console.log("Cols = " + this.cols);
      console.log("Img To Display = " + this.imgToDisplay);
      console.log("Img To Zip = " + this.imgToZip);
      //console.log("Song To Display = " + this.songToDisplay);
      console.log("Nb Img To See = " + this.nbImgToSee);
      console.log("Fixation Length = " + this.fixationLength);
      console.log("Item Length = " + this.itemLength);
      console.log("Randomize Img Pos = " + this.randomizeImgPos);
      console.log("Song Position = " + this.songPosition);
    }, 1000);
  }

  setupZip(){
    this.evalJsonService.nbItem = this.nbItem;
    this.evalJsonService.nameEval = this.nameEval;
    this.evalJsonService.output = this.output;
    this.evalJsonService.infoPatient = this.infoPatient;
    this.evalJsonService.skillToEvaluate = this.skillToEvaluate;
    this.evalJsonService.rows = this.rows;
    this.evalJsonService.cols = this.cols;
    this.evalJsonService.imgToDisplay = this.imgToDisplay;
    this.evalJsonService.imgToZip = this.imgToZip;
    this.evalJsonService.songToDisplay = this.songToDisplay;
    this.evalJsonService.nbImgToSee = this.nbImgToSee;
    this.evalJsonService.fixationLength = this.fixationLength;
    this.evalJsonService.itemLength = this.itemLength;
    this.evalJsonService.randomizeImgPos = this.randomizeImgPos;
    this.evalJsonService.songPosition = this.songPosition;

    //this.evalJsonService.createEval();
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    this.startUnzip = false;
    this.router.navigate(['/informations']);
  }
}
