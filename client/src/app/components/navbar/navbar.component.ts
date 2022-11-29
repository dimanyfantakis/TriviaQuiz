import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  subscription: Subscription;
  loggedIn: boolean;
  registerFormType = "Register";
  loginFormType = "Login";
  username = "";
  password = "";

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.subscription = authService.onToggle().subscribe(
      (value) => this.loggedIn = value
    );
  }

  ngOnInit() {
  }

  openRegisterForm(): void {

    const dialogRef = this.dialog.open(AuthFormComponent, {height: '550px', width: '350px', disableClose: true,
    data: {formType: this.registerFormType, username: this.username, password: this.password}});

    dialogRef.afterClosed().subscribe(res => {
      if (res == false) {
        this.resetFormFields();
        return;
      }
      if (!(res.username && res.password)) {
        //this.flashMessage.show('Username and password are required', {timeout: 3000});
        this.resetFormFields();
        return;
      }

      const newUser = {
        username: res.username,
        password: res.password
      }

      this.register(newUser).subscribe(registerResponse => {
        if(!registerResponse.body.success) {
          console.log(registerResponse.body.message);
          return;
        }
        this.login(newUser).subscribe(loginResponse => {
          if(!loginResponse.body.success) {
            console.log(loginResponse.body.message);
            return;
          }
          this.authService.setUserData(newUser, loginResponse.body.token);
        },
        error => {
          console.log(error);
        });
      },
      error => {
        this.resetFormFields();
        console.log(error);
      });
    })
  }
  
  register(newUser: User) {
    return this.authService.registerUser(newUser);
  }

  openLoginForm(): void {
    const dialogRef = this.dialog.open(AuthFormComponent, {height: '550px', width: '350px', disableClose: true,
    data: {formType: this.loginFormType, username: this.username, password: this.password}});

    dialogRef.afterClosed().subscribe(res => {
      if (res == false) {
        this.resetFormFields();
        return;
      }
      if (!(res.username && res.password)) {
        //this.flashMessage.show('Username and password are required', {timeout: 3000});
        return;
      }
      this.username = res.username;
      this.password = res.password;

      const newUser = {
        username: res.username,
        password: res.password
      }
      
      this.login(newUser).subscribe(loginResponse => {
        if(!loginResponse.body.success) {
          console.log(loginResponse.body.message);
          return;
        }
        this.authService.setUserData(newUser, loginResponse.body.token);
      },
      error => {
        console.log(error);
        //this.flashMessage.show('A user with that username and password does not exist', {timeout: 3000});
        this.resetFormFields();
      });
      
    })
  }

  login(newUser: User) {
    return this.authService.loginUser(newUser);
  }

  logout() {
    this.authService.logout();
    this.resetFormFields();
  }

  resetFormFields() {
    this.username = "";
    this.password = "";
  }
}
