import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'app/services/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: [];
  displayedColumns: string[] = ['username', 'score', 'category'];

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.getLeaderBoard().subscribe((res) => {
      console.log(res.body.leaderboard);
      this.leaderboard = res.body.leaderboard;
    })
  }

}
