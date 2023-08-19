import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  constructor(private form: FormBuilder) {}

  spaceValidation(control: AbstractControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    } else {
      return null;
    }
  }

  wpForm(): FormGroup {
    return this.form.group({
      workspace: ['', Validators.required],
      name: ['', [Validators.required, this.spaceValidation]],
      description: [
        '',
        [Validators.required, Validators.minLength(10), this.spaceValidation],
      ],
      theme: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      members: [[], Validators.required],
    });
  }

  createTaskForm(): FormGroup {
    return this.form.group({
      name: ['', [Validators.required, this.spaceValidation]],
      priority: ['Low', Validators.required],
      description: [
        '',
        [Validators.required,
        Validators.minLength(10),
        this.spaceValidation,]
      ],
      from: ['', Validators.required],
      to: ['', Validators.required],
      images: [[]],
      assignee: [[], Validators.required],
      reporter: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  createCommentForm():FormGroup {
    return this.form.group({
      comment: [
        '',[
          Validators.required,
        Validators.minLength(10),
        this.spaceValidation,]
      ],
    });
  }
}
