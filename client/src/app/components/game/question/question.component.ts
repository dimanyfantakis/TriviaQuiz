import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Question } from 'app/models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() set question(value: Question) {
    if (value === this._question) {
      return;
    }
    this._question = value;
    this.setAnswers();
  }
  @Output() onChooseAnswer: EventEmitter<string> = new EventEmitter();
  _question: Question;
  answers: string[];

  constructor() { }

  ngOnInit() {
    this.setAnswers();
  }

  chooseAnswer(answer: string) {
    this.onChooseAnswer.emit(answer);
    
  }

  private setAnswers() {
    this.answers = this._question.incorrect_answers.map(element => element);
    this.answers.push(this._question.correct_answer);
    this.shuffle(this.answers);
  }

  shuffle(answers) {
    let currentIndex = answers.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex], answers[currentIndex]];
    }
  
    return answers;
  }

  
}
