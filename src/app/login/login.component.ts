import { Component } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Status } from '../models/status';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faFacebookF = faFacebookF;
  faGithub = faGithub;
  faGoogle = faGoogle;
  frm!: FormGroup;
  status!: Status;

  constructor(
    private service: LoginService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    //library.add(fas, far, fab);
  }

  get f() {
    return this.frm.controls;   // needed for validation in html file
  }

  onPost() {
    this.status = { statucCode: 0, message: "wait..." };
    //console.log(this.frm.value);
    this.service.login(this.frm.value).subscribe({
      next: (res) => {
        //console.log(res);
        // save username, token in local storage
        this.authService.addUsername(this.frm.value.username);
        this.authService.addAccessToken(res.accessToken);
        this.authService.addRefreshToken(res.refreshToken);        

        this.status.statucCode = 0;
        this.status.message = "Logged in successfull !!!";
        
        this.router.navigate(['./dashboard']);
        // this.status = res;
        // this.frm.reset();
      },
      error: (err) => {
        this.status.statucCode = 0;
        this.status.message = "SOme error occured in server side";
        console.log(err);
      }
      // complete: () => {
      //   this.status.statucCode = 0;
      //   this.status.message = "";
      // }
    })
  }

  ngOnInit(): void {
    this.frm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    })

    if(this.authService.isLoggedIn()){
      this.router.navigate(['./dashboard']);
    }
  }
}
