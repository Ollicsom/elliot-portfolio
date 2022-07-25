import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("fullname")
  fullname: any;
  @ViewChild("job")
  job: any;
  series: any;
  vh: number = 0;
  vw: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let offset =  window.pageYOffset;
    let offsetParralax1 = offset * 0.5;
    let offsetParralax2 = offset * 1;
    this.renderer.setStyle(this.fullname.nativeElement, 'transform', `translateY(-${Math.round(offsetParralax1)}px)`);
    this.renderer.setStyle(this.job.nativeElement, 'transform', `translateY(-${Math.round(offsetParralax2)}px)`);
  }

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getSeries(localStorage.getItem('language') || '').subscribe(series => this.series = series)
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }

}
