import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  http = inject( HttpClient );

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;

  refreshToken: string | null = null;

  cookieService = inject( CookieService );

  get isAuthenticated(): boolean {
    if ( !this.token ) {
      this.token = this.cookieService.get( 'token' );
      this.refreshToken = this.cookieService.get( 'refreshToken' );
    }
    return !!this.token;
  }

  login( payload: { username: string, password: string } ) {
    const fd = new FormData();
    fd.append( 'username', payload.username );
    fd.append( 'password', payload.password );

    return this.http.post<TokenResponse>( `${ this.baseApiUrl }token`, fd ).pipe(
      tap( ( response ) => {
        this.saveToken( response );
      } )
    );
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>( `${ this.baseApiUrl }refresh`,
      {
        refresh_token: this.refreshToken,
      } ).pipe(
      tap( ( response ) => {
        this.saveToken( response );
      } ),
      catchError( err => {
        this.logout();
        return throwError( err );
      } )
    );
  }

  saveToken( response: TokenResponse ) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set( 'token', response.access_token );
    this.cookieService.set( 'refreshToken', response.refresh_token );
  }

  logout() {
    this.cookieService.deleteAll();
  }
}


