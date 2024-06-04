import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
  private jwtHelper = new JwtHelperService();

  constructor(private apiService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.apiService.getToken();

    console.log("Interceptando a requisição"); // Log para verificar se o interceptor está sendo chamado

    if (token) {
      console.log("Token encontrado:", token); // Log adicional para verificar o token
    }

    if (token && this.jwtHelper.isTokenExpired(token)) {
      console.log("Token expirado, tentando renovar..."); // Log para verificar a expiração do token
      return from(this.apiService.renewToken()).pipe(
        switchMap((newToken: string) => {
          this.apiService.setToken(newToken);
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`)
          });
          console.log("Requisição clonada com novo token"); // Log para confirmar a clonagem da requisição
          return next.handle(clonedRequest);
        }),
        catchError((error) => {
          console.error('Erro ao renovar o token', error);
          return throwError(error);
        })
      );
    }

    const clonedRequest = token ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) : req;

    console.log("Enviando a requisição clonada"); // Log para verificar o envio da requisição clonada
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Erro 401 - Não autorizado', error); // Log para erros de autorização
        }
        return throwError(error);
      })
    );
  }
}
