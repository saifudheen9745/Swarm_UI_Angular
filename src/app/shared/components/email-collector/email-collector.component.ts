import { Component, EventEmitter, Output } from '@angular/core';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-email-collector',
  templateUrl: './email-collector.component.html',
  styleUrls: ['./email-collector.component.css'],
})
export class EmailCollectorComponent {

  @Output() EmitSelectedEmails:EventEmitter<string[]> = new EventEmitter();

  emails: string[] = [];
  email: string = '';
  emailError: string = '';


  addEmail = () => {
    console.log(this.email);
    let isduplicate = this.emails.indexOf(this.email);
    if (isduplicate < 0) {
      this.emails.push(this.email);
      this.email = '';
    } else {
      this.emailError = 'Email already exist';
    }
  };

  removeEmail(item: string) {
    this.emails = this.emails.filter((email) => email !== item);
  }


  validateEmail = (): void => {
    if (this.email != '') {
      if (emailRegex.test(this.email)) {
        this.emailError = '';
      } else {
        this.emailError = 'Invalid email';
      }
    }
  };

  submit(){
    this.EmitSelectedEmails.emit(this.emails)
    this.emails = []
  }
}
