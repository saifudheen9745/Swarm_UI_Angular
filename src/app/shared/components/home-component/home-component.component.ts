import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../services/greeting/greeting.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  greeting: string = '';
  formattedDate: string = '';
  constructor(private greetingService: GreetingService) {}
  ngOnInit() {
    const { greeting, formattedDate } = this.greetingService.getGreetingData();
    this.greeting = greeting;
    this.formattedDate = formattedDate;
  }
}
