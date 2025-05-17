import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { delay, from, map, skip, take, tap } from 'rxjs';

@Component( {
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
  ],
  standalone: true,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
} )
export class LoginPageComponent {

  authService = inject( AuthService );

  form = new FormGroup( {
    username: new FormControl<string | null>( null, Validators.required ),
    password: new FormControl<string | null>( null, Validators.required )
  } );

  constructor() {
    from( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] )
      .pipe(
        map( value => value * 2 ),
        tap( value => {
          this.form.patchValue( { username: value.toString() } );
        } )
      ).subscribe( value => console.log( value ) );
  }

  onSubmit( event: Event ) {
    if ( this.form.valid ) {
      // @ts-ignore
      this.authService.login( this.form.value ).subscribe( res => {
        console.log( res );
      } )
    }
  }

}
