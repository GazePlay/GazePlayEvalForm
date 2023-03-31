import { Injectable } from '@angular/core';
import {EvalJsonService} from "../json/eval-json.service";
import {ThemeService} from "../theme/theme.service";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseVersion: number = 1;
  openRequest: IDBOpenDBRequest | undefined;

  constructor(private evalJsonService: EvalJsonService,
              private themeService: ThemeService) {
  }

  /**
   * Initialize the database;
   * If the store we search does not exit then we create it;
   */
  init(){

    // Opening of the Database
    this.openRequest = indexedDB.open('GazePlayEvalDB', this.databaseVersion);

    // Creation of Stores if the version changes
    this.openRequest.onupgradeneeded = event => {

      // @ts-ignore
      const db = event.target.result;

      // Creation of Eval Store if this one does not exist
      if (!db.objectStoreNames.contains("GazePlayEval")) {
        db.createObjectStore('GazePlayEval', {autoIncrement: true});
      }

      // Creation of Language Store if this one does not exist
      if (!db.objectStoreNames.contains("Settings")) {
        db.createObjectStore('Settings', {autoIncrement: true});
      }
    }
  }

  save() {

    // Opening of the Database
    this.openRequest = indexedDB.open('GazePlayEvalDB', this.databaseVersion);

    this.openRequest.onsuccess = event => {

      // @ts-ignore
      const db = event.target.result;

      // Save GazePlay Eval
      const gazePlayEvalStore = db.transaction(['GazePlayEval'], 'readwrite');
      const gazePlayEvalObjectStore = gazePlayEvalStore.objectStore('GazePlayEval');
      const storeGazePlayEvalRequest = gazePlayEvalObjectStore.get(1);
      storeGazePlayEvalRequest.onsuccess = () => {
        gazePlayEvalObjectStore.put(this.evalJsonService.save());
      };

      // Save Settings
      const settingsStore = db.transaction(['Settings'], 'readwrite');
      const settingsObjectStore = settingsStore.objectStore('Settings');
      const storeSettingsRequest = settingsObjectStore.get(1);
      storeSettingsRequest.onsuccess = () => {
        settingsObjectStore.put(this.themeService.themeChoice);
      };
    }
  }

  load(){

    // Opening of the Database
    this.openRequest = indexedDB.open('GazePlayEvalDB', this.databaseVersion);

    this.openRequest.onsuccess = event => {

      // @ts-ignore
      const db = event.target.result;

      // Load GazePlay Eval
      const gazePlayEvalStore = db.transaction(['GazePlayEval'], 'readwrite');
      const gazePlayEvalObjectStore = gazePlayEvalStore.objectStore('GazePlayEval');
      const storeGazePlayEvalRequest = gazePlayEvalObjectStore.get(1);
      storeGazePlayEvalRequest.onsuccess = () => {
        this.evalJsonService.load(storeGazePlayEvalRequest.result);
      };

      // Load Settings
      const settingsStore = db.transaction(['Settings'], 'readwrite');
      const settingsObjectStore = settingsStore.objectStore('Settings');
      const storeSettingsRequest = settingsObjectStore.get(1);
      storeSettingsRequest.onsuccess = () => {
        this.themeService.changeTheme(storeSettingsRequest.result);
      };
    }
  }

}
