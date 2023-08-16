import { Component, OnDestroy, OnInit } from '@angular/core';
import { GreetingService } from '../../services/greeting/greeting.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit,OnDestroy {
  user:string = ''
  greeting: string = '';
  formattedDate: string = '';
  storeSusbcription:Subscription
  constructor(private greetingService: GreetingService,private store:Store) {}
  ngOnInit() {
    const { greeting, formattedDate } = this.greetingService.getGreetingData();
    this.greeting = greeting;
    this.formattedDate = formattedDate;
    this.storeSusbcription = this.store.select((state)=>state).subscribe((data:any)=>{
      this.user = data?.userDetailsState?.name
      
    })
  }
  ngOnDestroy(): void {
      if(this.storeSusbcription){
        this.storeSusbcription.unsubscribe()
      }
  }
}
