import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
// Create a Subject to emit user registration data
private userDataSubject = new Subject<any>();

// Expose the Subject as an Observable
userData$ = this.userDataSubject.asObservable();

// Method to send user data
sendUserData(userData: any) {
  this.userDataSubject.next(userData);
}
  

}
