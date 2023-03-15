import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseVersion: number = 1;
  openRequest: IDBOpenDBRequest | undefined;

  constructor() {
    this.init();
  }

  /**
   * Initialize the database;
   * If the store we search does not exit then we create it;
   */
  init(){

    // Opening of the Database
    this.openRequest = indexedDB.open('saveEval', this.databaseVersion);

    // Creation of Stores if the version changes
    this.openRequest.onupgradeneeded = event => {
      // @ts-ignore
      const db = event.target.result;
      // @ts-ignore
      const transaction = event.target.transaction;

      // Creation of Eval Store if this one does not exist
      if (!db.objectStoreNames.contains("Eval")) {
        db.createObjectStore('Eval', {autoIncrement: true});
        const evalDatabase = transaction.objectStore('Eval');
        //evalDatabase.add(this.playlistService.nameActualPlaylist);
      }

      // Creation of Theme Store if this one does not exist
      if (!db.objectStoreNames.contains("Theme")) {
        db.createObjectStore('Theme', {autoIncrement: true});
        const themeDatabase = transaction.objectStore('Theme');
        //themeDatabase.add(this.themeService.theme);
      }

      // Creation of Language Store if this one does not exist
      if (!db.objectStoreNames.contains("Language")) {
        db.createObjectStore('Language', {autoIncrement: true});
        const languageDatabase = transaction.objectStore('Language');
        //languageDatabase.add(this.languageService.activeLanguage);
      }
    }

    // Success open Database
    this.openRequest.onsuccess = event => {
      // @ts-ignore
      const db = event.target.result;

    }

  }
}
