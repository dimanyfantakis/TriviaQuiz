import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from 'app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private subject = new Subject<boolean>();
  private registerUrl: string = "http://localhost:5000/api/v1/user/register";
  private loginUrl: string = "http://localhost:5000/api/v1/user/login";

  constructor(private http:HttpClient) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user, 
      {headers: new HttpHeaders({
        'Content-type' : 'application/json'
      }),
      observe: "response"});
  }
  
  registerUser(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user, 
      {headers: new HttpHeaders({
        'Content-type' : 'application/json'
      }),
      observe: "response"});
  }

  setUserData(user: User, jwt: string): void {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    this.toggleLog();
  }

  logout(): void {
    localStorage.clear();
    this.toggleLog();
  }

  toggleLog(): void {
    this.loggedIn = !this.loggedIn;
    this.subject.next(this.loggedIn);
  }

  onToggle(): Observable<boolean> {
    return this.subject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
