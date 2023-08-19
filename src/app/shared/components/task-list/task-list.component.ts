import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { task } from 'src/app/config/config.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: task[];
  @Input() heading: string;
  @Output() taskIdEmitter: EventEmitter<string> = new EventEmitter();
  selectedTask: task;
  getDetailsOfATaskSubscription: Subscription;
  emitTaskId(taskId: string) {
    this.taskIdEmitter.emit(taskId);
  }
}
