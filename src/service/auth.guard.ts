import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const email= localStorage.getItem("email")
  if(email){

    return true

  }else{
    return false;
  }
 
};
