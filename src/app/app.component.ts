import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, MatListModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'xperience_videos';
  tournaments: any;
  selectedTournament: any;
  constructor(private http: HttpClient) {
  }
  async ngOnInit() {
    this.http.get("/api/videos").subscribe((tournaments: any) => {
      this.tournaments = tournaments
    })

  }

  goToTournament(tournamentName: string) {
    this.selectedTournament = this.tournaments.find((tournament: any) => tournament.tournamentName == tournamentName)
  }

  goToTournaments() {
    this.selectedTournament = null
  }
}
