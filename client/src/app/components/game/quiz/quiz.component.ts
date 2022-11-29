import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'app/models/Category';
import { Question } from 'app/models/Question';
import { QuizService } from 'app/services/quiz.service';

const LAST_QUESTION_ID = 9;
const CORRECT_SCORE = 10;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  category: Category;
  questions: Question[] = [];
  questionId: number;
  score: number;

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.questionId = 0;
    this.score = 0;
    this.category = JSON.parse(this.route.snapshot.paramMap.get('category'));
    this.quizService.getQuestions(this.category.id.toString(), "easy").subscribe((res) => {
      this.setQuestions(res.results);
    })
  }

  setQuestions(res: Question[]) {
    this.questions = res;
    this.questions.forEach((e) => {
      e.question = this.decodeString(e.question);
      e.correct_answer = this.decodeString(e.correct_answer);
      e.incorrect_answers.forEach((a, index, array) => {
        array[index] = this.decodeString(a);
      });
    });
  }

  private decodeString(encoded: string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encoded;
    return textArea.value;
  }

  validateAnswer(answer: string) {
    if (this.isAnswerCorrect(answer)) {
      this.score += CORRECT_SCORE;
    }
    if (this.isLastQuestion()) {
      this.router.navigate(['/result', {score: this.score, category: this.category.name}]);
    }
    this.questionId++;
  }

  private isAnswerCorrect(answer: string) {
    return this.questions[this.questionId].correct_answer === answer;
  }

  private isLastQuestion() {
    return this.questionId === LAST_QUESTION_ID;
  }
  
}
