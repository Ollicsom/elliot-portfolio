import { Component, OnInit, Renderer2 } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { Serie } from '../shared/models/serie.model';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {
  series: Array<Serie>;
  mediaEndpoint = environment.mediaEndpoint;
  faCirclePlus = faCirclePlus;

  constructor(
    private apiService: ApiService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.apiService.getSeries(localStorage.getItem('language') || '').subscribe((series: Array<Serie>) => this.series = series);
  }

  
  setAnimation(event: any) {
    this.renderer.setStyle(event.fromElement, 'transition-duration', `0.5s`);
    setTimeout(() => {
      this.renderer.setStyle(event.fromElement, 'transition-duration', `0s`);
    }, 500)
  }

}
