import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './authentication/token.interceptor';
import { GameStatComponent } from './game-stat/game-stat.component';
import { AddGameDialog } from './game/game.component';
import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PlayerStatComponent } from './player-stat/player-stat.component';
import { PlayerStatService } from './player-stat/player-stat.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		MatSliderModule,
		MatToolbarModule,
		MatTableModule,
		MatSortModule,
		LoginComponent,
		RegisterComponent,
		HomepageComponent,
		GameComponent,
		GameStatComponent,
		AddGameDialog,
		GameStatComponent,
		PlayerStatComponent,
		RouterOutlet
	],
	providers: [
		HttpClientModule,
		GameService,
		PlayerStatService,
		{
			provide:
			HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
