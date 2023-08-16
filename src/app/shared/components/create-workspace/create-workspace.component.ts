
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';


@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css'],
})
export class CreateWorkspaceComponent {
  @Input() userId: string;
  @Output() EmitWorkspaceDetails:EventEmitter<{name:string,theme:string}> = new EventEmitter()
  workSpaceName: string = '';
  theme: string = '';
  constructor(private toast:ToastService) {}

  submitForm() {
    if (
      this.theme === '' ||
      this.workSpaceName === '' ||
      this.workSpaceName.length === 0 ||
      /\s/.test(this.workSpaceName)
    ) {
      this.toast.customErrorToast('All fields are required');
      return;
    }
    this.EmitWorkspaceDetails.emit({name:this.workSpaceName,theme:this.theme})
  }


}
