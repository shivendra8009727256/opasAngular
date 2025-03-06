import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements OnInit {
  dollarToINR: number = 0;
 
  private apiUrl = 'https://v6.exchangerate-api.com/v6/046e4f3182844d0c19417cac/latest/USD';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
