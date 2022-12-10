import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Serie } from 'src/app/shared/models/serie.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-galleries',
  templateUrl: './all-galleries.component.html',
  styleUrls: ['./all-galleries.component.scss']
})
export class AllGalleriesComponent implements OnInit {
  series: Array<Serie>;
  vw: number;
  mediaEndpoint = environment.mediaEndpoint;

  constructor(
    private apiService: ApiService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.apiService.getSeries(localStorage.getItem('language') || '').subscribe((series: Array<Serie>) => this.series = series);
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  }

  
  setAnimation(event: any) {
    this.renderer.setStyle(event.fromElement, 'transition-duration', `0.5s`);
    setTimeout(() => {
      this.renderer.setStyle(event.fromElement, 'transition-duration', `0s`);
    }, 500)
  }

}
