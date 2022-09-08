import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToasterComponent implements OnInit {
  currentToasts: any[] = [];
  id: number;
  lastId: number;

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
        this.id ++;
      const currentToast: any = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
        id: this.id
      };
      this.currentToasts.push(currentToast);
      setTimeout( () => {
        this.dispose(0)
      }, 30000000);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number) {
      if(this.lastId != index){
        this.lastId = this.currentToasts[index].id;
        this.currentToasts.splice(index, 1);
        this.cdr.detectChanges();
      }
  }
}