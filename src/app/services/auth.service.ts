import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = ['http://localhost:8091/api/users/']

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Authorization': 'Bearer '
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient
      ) { }
    
      
      
      signup(signupRequest: any): Observable<any> {
        return this.http.post(BASE_URL + "sign-up", signupRequest)
      }
    
      login(username: string, password_hash: string): Observable<any> {
        return this.http.post(BASE_URL + 'login', {
          username,
          password_hash
        }, httpOptions);
      }
      
    
    //   
    
      private createAuthorizationHeader() {
        const jwtToken = localStorage.getItem('JWT');
        if (jwtToken) {
          return new HttpHeaders().set(
            'Authorization', 'Bearer ' + jwtToken
          )
        } else {
          console.log("JWT token not found in the Local Storage");
        }
        return null;
      }

      saveToken(token: string): void {
        localStorage.setItem('authToken', token);
      }
    
      getToken(): string | null {
        return localStorage.getItem('JWT');
      }

      isTokenExpired(): boolean {
        const token = localStorage.getItem('JWT');
        if (!token) return true; // No token found
    
        const decodedToken: any = jwtDecode(token);
        
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        console.log(decodedToken.exp,"token exp",currentTime, decodedToken.exp < currentTime)
        return decodedToken.exp < currentTime; // Expired if exp < now
      }
}
