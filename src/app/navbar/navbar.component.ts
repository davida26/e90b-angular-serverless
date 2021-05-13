import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Auth from '@aws-amplify/auth';
import {
  onAuthUIStateChange,
  AuthState,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authState: AuthState;
  user: CognitoUserInterface | undefined;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  reload() {
    try {
      Auth.signOut();
      location.href = '/';
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
