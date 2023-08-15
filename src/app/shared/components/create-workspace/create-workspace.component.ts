import { Component } from '@angular/core';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css']
})
export class CreateWorkspaceComponent {
  workSpaceName:string = ''
  theme:string = ''
  submitForm(){
    console.log(this.workSpaceName,this.theme);
    
  }

}
