import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  username: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
  }

  viewLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
  }

  viewScoreboard(): void {
    this.router.navigate(['/user/scores']);
  }

  logout(): void {
    this.onLogout.emit();
  }
  
}
