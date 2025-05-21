import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { delay, from, map, skip, take, tap } from 'rxjs';
import { Router } from '@angular/router';

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

  router = inject( Router );

  form = new FormGroup( {
    username: new FormControl<string | null>( null, Validators.required ),
    password: new FormControl<string | null>( null, Validators.required )
  } );

  onSubmit( event: Event ) {
    if ( this.form.valid ) {
      // @ts-ignore
      this.authService.login( this.form.value ).subscribe( res => {
        this.router.navigate( [ '' ] );
        console.log(res)
      } );
    }
  }

}
