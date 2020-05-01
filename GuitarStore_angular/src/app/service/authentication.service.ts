import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class UserAuth{
  constructor(
    public status:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }

  // authenticate(username, password) {
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
  //   return this.httpClient.get<UserAuth>('http://localhost:8080/users/validateLogin',{headers}).pipe(
  //    map(
  //      userData => {
  //       sessionStorage.setItem('username',username);
  //       return userData;
  //      }
  //    )    );
  // }
  optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<UserAuth>('http://localhost:8484/users/validateLogin', {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        return userData;
       }
     )    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}