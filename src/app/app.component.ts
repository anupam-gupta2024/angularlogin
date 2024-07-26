import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

// import { faUsers } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularlogin';
  
  // faFacebookF = faFacebookF;

  constructor(private authService: AuthService) { }

  isLoggedIn: boolean = false;
  checkLoggedInUser() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
  }

  // name:string = "popsao"
  // name2:string = `Hello ${this.name}, how old are you?`;
}
