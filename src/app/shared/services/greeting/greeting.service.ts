import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GreetingService {
  getGreetingData(): { greeting: string; formattedDate: string } {
    const date = new Date();
    let greeting = '';
    let formattedDate = '';

    const hour = date.getHours();
    if (hour < 12) {
      greeting = 'Good morning!';
    } else if (hour < 16) {
      greeting = 'Good afternoon!';
    } else {
      greeting = 'Good evening!';
    }

    const options = { weekday: 'long', month: 'long', day: 'numeric' } as const;
    formattedDate = date.toLocaleDateString('en-US', options);
    return { greeting, formattedDate };
  }
}
