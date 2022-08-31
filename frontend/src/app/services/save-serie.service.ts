import { EventEmitter } from "@angular/core";

export class saveSerieService {
    saveSerieEvent: EventEmitter<string> = new EventEmitter();
  constructor() {}
}