import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  

  constructor(private http: HttpClient, private authService: AuthService) {}
  
  private dataProduct=new BehaviorSubject<Product[]>([])
  currentData = this.dataProduct.asObservable();


  getHello(): Observable<string> {
    return this.http.get(`${this.baseUrl}/hello`, { responseType: 'text' });
  }

  postMessage(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  getProducts(): Observable<any> {
    //this.currentData.next()
    return this.http.get<any>(`${this.baseUrl}/getProducts`);
  }

  sendProductsData(data:Product[]){
    this.dataProduct.next(data);
  }

  login(username: string, password: string) {
    const body = { username, password };
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`,  body, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add JWT token here
    });
  }
}

