import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component( {
  selector: 'app-profile-card',
  imports: [
    ImgUrlPipe
  ],
  standalone: true,

  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
} )
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
