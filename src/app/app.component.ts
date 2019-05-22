import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router:Router) {}
  title = 'DJ Tale';

  goToHome() {
    this.router.navigate(['home']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }
  
  goToPlaylists() {
    this.router.navigate(['playlists']);
  }
}
