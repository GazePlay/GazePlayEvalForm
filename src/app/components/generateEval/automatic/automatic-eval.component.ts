import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import * as JSZip from "jszip";
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {ThemeService} from "../../../services/theme/theme.service";
import {SettingsService} from "../../../services/settings/settings.service";
import {EvalGenerationService} from "../../../services/evalGeneration/eval-generation.service";

@Component({
  selector: 'app-automatic-eval',
  templateUrl: './automatic-eval.component.html',
  styleUrls: ['./automatic-eval.component.css']
})
export class AutomaticEvalComponent implements OnInit{

  // @ts-ignore
  @ViewChild('nbItems') nbItemsInput: ElementRef;
  // @ts-ignore
  @ViewChild('minCols') minColsInput: ElementRef;
  // @ts-ignore
  @ViewChild('maxCols') maxColsInput: ElementRef;
  // @ts-ignore
  @ViewChild('minRows') minRowsInput: ElementRef;
  // @ts-ignore
  @ViewChild('maxRows') maxRowsInput: ElementRef;
  // @ts-ignore
  @ViewChild('minFixationLength') minFixationLengthInput: ElementRef;
  // @ts-ignore
  @ViewChild('maxFixationLength') maxFixationLengthInput: ElementRef;
  // @ts-ignore
  @ViewChild('minGoodAnswer') minGoodAnswerInput: ElementRef;
  // @ts-ignore
  @ViewChild('maxGoodAnswer') maxGoodAnswerInput: ElementRef;

  actualStep: number = 4;

  unzipImg: any[] = [];
  listImagesToDisplay: String[] = [];
  listImagesToZip: any[][] = [];
  nbImgUpload: number = 0;

  nbItems: number = 1;
  minCols: number = 1;
  maxCols: number = 1;
  minRows: number = 1;
  maxRows: number = 1;
  minFixationLength: number = 0;
  maxFixationLength: number = 0;
  minGoodAnswer: number = 1;
  maxGoodAnswer: number = 1;
  fillImages: boolean = false;
  reuseImages: boolean = false;
  addSongText: boolean = false;
  isSong: boolean = false;

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  constructor(private router: Router,
              private orderProgressBarService: OrderProgressBarService,
              private themeService: ThemeService,
              private settingsService: SettingsService,
              private evalGenerationService: EvalGenerationService) {

    this.cardTheme = this.themeService.cardTheme[0];
    this.cardHeaderTheme = this.themeService.cardTheme[1];
    this.cardTextTheme = this.themeService.cardTheme[2];
    this.buttonTheme = this.themeService.cardTheme[3];

    this.themeService.cardThemeObservable.subscribe(value => {
      this.cardTheme = value[0];
      this.cardHeaderTheme = value[1];
      this.cardTextTheme = value[2];
      this.buttonTheme = value[3];
    });
  }

  ngOnInit() {
    this.canAccess();
    this.evalGenerationService.reset();
  }

  canAccess(){
    if ((this.orderProgressBarService.actualStep + 1) < this.actualStep){
      this.router.navigate(['/home']);
    }
  }

  dropFile(droppedFiles: NgxFileDropEntry[]){
    for (const droppedFile of droppedFiles) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (!file.name.includes(".zip")){
            this.getImage(file);
          }else {
            this.unzipFile(file);
          }
        });
      }
    }
  }

  getImage(file: File){
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.listImagesToDisplay.push(String(reader.result));
        this.listImagesToZip.push([file.name, file]);
        this.nbImgUpload ++;
      };
    } catch (e) {
      console.log("Error");
    }
  }

  async unzipFile(file: File) {
    const unzip = new JSZip();
    this.unzipImg = await unzip.loadAsync(file).then(function (zip) {
      const unzipImg: any[][] = [];
      zip.forEach(function (relativePath, file) {
        file.async('blob').then(function (fileData) {
          const zipToFile = new File([fileData], file.name);
          const reader = new FileReader();
          try {
            reader.readAsDataURL(zipToFile);
            reader.onload = () => {
              unzipImg.push([String(reader.result), zipToFile.name, zipToFile]);
            };
          } catch (e) {
            console.log("Error");
          }
        });
      });
      return unzipImg;
    });
    this.getImageFromZip();
  }

  getImageFromZip(){
    const unzipInterval = setInterval(() => {
      if (this.unzipImg.length > 0){
        clearInterval(unzipInterval);
        for (let i=0; i<this.unzipImg.length; i++){
          this.listImagesToDisplay.push(this.unzipImg[i][0]);
          this.listImagesToZip.push([this.unzipImg[i][1], this.unzipImg[i][2]])
        }
        this.nbImgUpload = this.listImagesToDisplay.length;
      }
    }, 1000);
  }

  getNbItems(value: any){
    this.nbItems = value.target.value;
    if (value.target.value < 1){
      this.nbItems = 1;
    }
    this.nbItemsInput.nativeElement.value = this.nbItems;
    this.evalGenerationService.nbItems = this.nbItems;
  }

  getColsMin(value: any){
    this.minCols = value.target.value;
    if (value.target.value > 20){
      this.minCols = 20;
    }else if (value.target.value < 1){
      this.minCols = 1;
    }
    this.minColsInput.nativeElement.value = this.minCols;
    this.evalGenerationService.minCols = this.minCols;
  }

  getColsMax(value: any){
    this.maxCols = value.target.value;
    if (value.target.value > 20){
      this.maxCols = 20;
    }else if (value.target.value < 1){
      this.maxCols = 1;
    }
    this.maxColsInput.nativeElement.value = this.maxCols;
    this.evalGenerationService.maxCols = this.maxCols;
  }

  getRowsMin(value: any){
    this.minRows = value.target.value;
    if (value.target.value > 20){
      this.minRows = 20;
    }else if (value.target.value < 1){
      this.minRows = 1;
    }
    this.minRowsInput.nativeElement.value = this.minRows;
    this.evalGenerationService.minRows = this.minRows;
  }

  getRowsMax(value: any){
    this.maxRows = value.target.value;
    if (value.target.value > 20){
      this.maxRows = 20;
    }else if (value.target.value < 1){
      this.maxRows = 1;
    }
    this.maxRowsInput.nativeElement.value = this.maxRows;
    this.evalGenerationService.maxRows = this.maxRows;
  }

  getFixationLengthMin(value: any){
    this.minFixationLength = value.target.value;
    if (value.target.value < 0){
      this.minFixationLength = 0;
    }
    this.minFixationLengthInput.nativeElement.value = this.minFixationLength;
    this.evalGenerationService.minFixationLength = this.minFixationLength;
  }

  getFixationLengthMax(value: any){
    this.maxFixationLength = value.target.value;
    if (value.target.value < 0){
      this.maxFixationLength = 0;
    }
    this.maxFixationLengthInput.nativeElement.value = this.maxFixationLength;
    this.evalGenerationService.maxFixationLength = this.maxFixationLength;
  }

  getGoodAnswerMin(value: any){
    this.minGoodAnswer = value.target.value;
    if (value.target.value < 1){
      this.minGoodAnswer = 1;
    }else if (value.target.value > (this.minRows * this.minCols)){
      this.minGoodAnswer = this.minRows * this.minCols;
    }
    this.minGoodAnswerInput.nativeElement.value = this.minGoodAnswer;
    this.evalGenerationService.minGoodAnswer = this.minGoodAnswer;
  }

  getGoodAnswerMax(value: any){
    this.maxGoodAnswer = value.target.value;
    if (value.target.value < 1){
      this.maxGoodAnswer = 1;
    }else if (value.target.value > (this.maxRows * this.maxCols)){
      this.minGoodAnswer = this.maxRows * this.maxCols;
    }
    this.maxGoodAnswerInput.nativeElement.value = this.maxGoodAnswer;
    this.evalGenerationService.maxGoodAnswer = this.maxGoodAnswer;
  }

  getFillImages(value: boolean){
    this.fillImages = value;
    this.evalGenerationService.fillImages = value;
  }

  getReuseImages(value: boolean){
    this.reuseImages = value;
    this.evalGenerationService.reuseImages = value;
  }

  getAddSongText(value: boolean){
    this.addSongText = value;
    this.evalGenerationService.addSongText = value;
  }

  getIsSong(value: boolean){
    this.isSong = value;
    this.evalGenerationService.isSong = value;
  }

  generate() {
    this.settingsService.generateEvalAuto = true;
    this.settingsService.saveAuto();
    this.router.navigate(['/loading']).then(() => {
      this.evalGenerationService.setupEvalGeneration(this.listImagesToDisplay, this.listImagesToZip);
    });
  }

  previous() {
    this.settingsService.saveAuto();
    this.router.navigate(['/assets']);
  }
}
