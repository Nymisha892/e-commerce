import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl:  './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'e-commerce-app';
  message = '';
  inputMessage = '';
  response = '';
  valid = true;
  tokenExp=true;
  LoginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
  });

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    
    
      if (this.authService.isTokenExpired()) {
        this.tokenExp=true;
        localStorage.removeItem('JWT'); // Remove expired token
        this.router.navigate(['/login']); // Redirect to login page
      }
      else{
        this.tokenExp=false
      }
    

  }

  

  onSubmit(){
    console.log(this.LoginForm.get('username')," :username")
    
      this.apiService.postMessage(this.LoginForm.get('username')?.value,this.LoginForm.get('password')?.value).subscribe((data) => {
        this.response = data;
        console.log(data," :data")
        if(data=="Hello from Spring Boot!"){
          console.log("here")
          this.router.navigate(['/display']); 
          console.log("here1")
          this.valid=true
        }
      });
  
    

  }

}
