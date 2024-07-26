import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProtectedService } from '../services/protected.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  roles = "";

  constructor(private authService: AuthService,
    private protectedService: ProtectedService
  ) {
    // we will intercept each request and append httpHeader with access token in each request with the help of HttpInterceptor

    this.roles = this.authService.getUerRole();
  }

  username: string = this.authService.getUsername() ?? "";
  givenname: string = ""; role: string = "";
  userlist: any;

  ngOnInit(): void {
    this.protectedService.getUserData().subscribe({
      next: (res) => {
        //console.log(res);
        this.givenname = res.givenName;
        this.role = res.role;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.protectedService.getAllUser().subscribe({
      next: (res) => {
        //console.log(res);
        this.userlist = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // logOut() {
  //   this.authService.logout();
  // }
}
