import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { Language } from './shared/models/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    vh: number = 0;
    vw: number = 0;
    languages: Array<Language>;
    isMenuOpened = false;
    wasInside = false; 
    
    @HostListener('document:click')
    clickout() {
      if (!this.wasInside && this.isMenuOpened) {
        this.isMenuOpened = false;
      }
      this.wasInside = false;
    }
  
    constructor(
      private translateService: TranslateService,
      private apiService: ApiService
    ) {
        this.translateService.setDefaultLang(window.navigator.language.split('-')[0]);
        if( !localStorage.getItem('language') ){
          localStorage.setItem('language', window.navigator.language.split('-')[0]);
        }
        this.translateService.use(localStorage.getItem('language'))
    }

    changeLanguage(value: string){
      localStorage.setItem("language", value);
      this.translateService.use(localStorage.getItem('language') || window.navigator.language.split('-')[0]);
      window.location.reload();
    }

    ngOnInit() {
      this.apiService.getLanguages().subscribe((languages: Array<Language>) => this.languages = languages);
      this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    }

    switchMenuState() {
        this.isMenuOpened = !this.isMenuOpened
        this.wasInside = true;
    }

    clickInsideMenu() {
      this.wasInside = true;
    }
}

