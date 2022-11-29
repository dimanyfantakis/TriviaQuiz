import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ScoreService } from 'app/services/score.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: number;
  category: string;

  constructor(private scoreService: ScoreService, private route: ActivatedRoute, private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    this.score = parseInt(this.route.snapshot.paramMap.get('score'));
    this.category = this.route.snapshot.paramMap.get('category');
    if (this.authService.isLoggedIn()) {
      this.saveUsersScore();
    }
  }

  playAgain(): void {
    this.router.navigate(['/']);
  }

  saveUsersScore(): void {
    this.scoreService.addUsersScore(this.score, this.category).subscribe((res) => {
      if(res.body.success === false) {
        console.log(res.body.message);
      }
    });
  }

}