import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  
  loginForm!: FormGroup
  valid= true;

  constructor(private authService: AuthService, private apiService: ApiService, private fb: FormBuilder, private router: Router) {}
  

  ngOnInit() {
    if(localStorage.getItem('JWT')==null){
      this.valid=true;
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe((response) => {
      console.log(response,"response");
      if (response.token) {
        
        const jwtToken = response.token;
        localStorage.setItem('JWT', jwtToken);
        this.valid=false;
        this.router.navigate(['/home']); 
        
      }
    })
  }
}
