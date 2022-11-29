import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'app/services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: [];
  displayedColumns: string[] = ['score', 'category'];

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.getUsersScores().subscribe((res) => {
      this.scores = res.body.scores;
      console.log(this.scores)
    },
    error => {
      console.log(error);
    })
  }

}
