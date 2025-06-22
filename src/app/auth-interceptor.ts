import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT'); // Get JWT from storage

    // Attach JWT token to request headers
    const clonedRequest = token 
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { // Unauthorized (Expired/Invalid Token)
          localStorage.removeItem('JWT'); // Clear expired token
          this.router.navigate(['/login']); // Redirect to login
        }
        return throwError(() => error);
      })
    );
  }
}
