import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent {
  
  showModal: boolean;
  
  @Input() modalName: string;
  
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  submit(){

  }
}
