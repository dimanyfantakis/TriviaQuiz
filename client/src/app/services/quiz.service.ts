import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  categoriesUrl = "https://opentdb.com/api_category.php";
  questionUrl : string;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }

  getQuestions(categoryId: string, difficulty: string): Observable<any> {
    this.questionUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<any>(this.questionUrl);
  }
}
