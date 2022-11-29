import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './components/game/play/play.component';
import { QuizComponent } from './components/game/quiz/quiz.component';
import { ResultComponent } from './components/game/result/result.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { LeaderboardComponent } from './components/user-profile/leaderboard/leaderboard.component';
import { ScoresComponent } from './components/user-profile/scores/scores.component';
import { AuthGuard } from './guards/auth.guard';
import { NavigationGuard } from './guards/navigation.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: PlayComponent},
  { path: 'quiz', component: QuizComponent, canActivate: [NavigationGuard]},
  { path: 'result', component: ResultComponent, canActivate: [NavigationGuard]},
  { path: 'user/scores', component: ScoresComponent, canActivate: [AuthGuard]},
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
