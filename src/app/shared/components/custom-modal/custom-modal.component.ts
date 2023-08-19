import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProjectTaskService } from '../project-task/project-task.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent implements OnInit {
  showModal: boolean;
  @Input() modalName: string;
  @Input() showButton: boolean = true;
  @Input() activateModal: boolean;

  constructor(public pt: ProjectTaskService) {}

  ngOnInit(): void {
    if (this.activateModal) {
      this.showModal = this.activateModal;
    }
  }

  toggleModal(): void {
    this.showModal = true; // Set showModal to false to close the modal
  }

  closeModal() {
    this.showModal = false;
  }

  submit() {}
}
