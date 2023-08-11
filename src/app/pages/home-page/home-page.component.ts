import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store'
import { userDetailsSelector } from 'src/app/shared/ngrx/ngrx.reducers';
import {AppState} from '../../shared/ngrx/ngrx.reducers'
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private store: Store,private http:HttpClient) {}
  ngOnInit(): void {
    
  }

  
}
