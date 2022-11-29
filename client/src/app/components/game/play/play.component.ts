import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/models/Category';
import { QuizService } from 'app/services/quiz.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  quizCategories: String[];
  categories: Category[] = [];
  category: Category;
  selectedCategory: string = "";

  constructor(private quizService: QuizService , private router: Router) { }

  ngOnInit() {
    this.quizService.getCategories().subscribe((res) => {
      this.categories = res.trivia_categories;
      this.quizCategories = res.trivia_categories.map(element => element.name);
    })
  }

  toggleNewGame(): void {
    if (!this.selectedCategory) {
      alert("Select a category")
      return;
    }
    this.category = this.categories.find(i => i.name === this.selectedCategory);
    this.router.navigate(['/quiz', {category: JSON.stringify(this.category)}]);
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
