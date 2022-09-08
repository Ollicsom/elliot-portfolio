import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToastComponent implements OnInit {

  @Input() type: string;
  @Input() message: string;
  @Input() title: string;
  faTimes = faTimes;
  @Output() disposeEvent = new EventEmitter<string>();

  constructor(
    ) {}

  ngOnInit() {
  }

  dismiss() {
    this.disposeEvent.emit();
  }
}