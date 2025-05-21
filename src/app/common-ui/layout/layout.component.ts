import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileService } from '../../data/services/profile.service';

@Component( {
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  standalone: true,

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
} )
export class LayoutComponent {
  profileService = inject( ProfileService );
}
