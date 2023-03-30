import { AuthenticationGuard } from './authentication/authentication.guard';
import { GameStatComponent } from './game-stat/game-stat.component';
import { GameComponent } from './game/game.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerStatComponent } from './player-stat/player-stat.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: '',
		component: LoginComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'homepage',
		component: HomepageComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'game',
		component: GameComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'game/:id',
		component: GameStatComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'player-stat',
		component: PlayerStatComponent,
		canActivate: [AuthenticationGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
