import { EventEmitter } from "@angular/core";
import { Serie } from "../models/serie.model";

export class saveSerieService {
    saveSerieEvent: EventEmitter<Serie> = new EventEmitter();
  constructor() {}
}