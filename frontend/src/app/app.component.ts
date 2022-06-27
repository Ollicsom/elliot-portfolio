import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
      private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang(window.navigator.language.split('-')[0]);
        this.translateService.use(localStorage.getItem('language') || window.navigator.language.split('-')[0])
    }
}
