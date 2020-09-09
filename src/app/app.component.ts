import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'users-jwt-frontend';

  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}
