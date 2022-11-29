import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/models/User';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private addScoreUrl = "http://localhost:5000/api/v1/user/addScore";
  private scoresUrl = "http://localhost:5000/api/v1/user/getScores?username=";
  private leaderboardUrl = "http://localhost:5000/api/v1/user/getLeaderboard";
  private user: User;

  constructor(private http: HttpClient) { }

  addUsersScore(score: number, category: string): Observable<any> {
    this.user = JSON.parse(localStorage.getItem('user'));
    const body = {"username": this.user.username, "score": score, "category": category}
    const headers = {headers: new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }),
      observe: 'response' as 'body'};
    
    return this.http.post(this.addScoreUrl, body, 
      headers);
  }

  getUsersScores(): Observable<any> {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.http.get<any>(this.scoresUrl + this.user.username, 
      {headers: new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }),
      observe: "response"});
  }

  getLeaderBoard(): Observable<any> {
    return this.http.get<any>(this.leaderboardUrl, 
      {headers: new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      }),
      observe: "response"});
  }

}
