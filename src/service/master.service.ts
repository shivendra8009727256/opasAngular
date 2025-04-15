import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { user } from '../app/model/user';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  http=inject(HttpClient)
  
  login(obj:user){
    console.log("OBJ>>>",obj)
    return this.http.post("https://opasbizz.in/api/auth/login",obj)
  }
  getData(){
        return this.http.get("https://opasbizz.in/api/opas/get")
  }
  
  
}
