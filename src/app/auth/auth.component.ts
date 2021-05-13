import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
  FormFieldTypes,
} from '@aws-amplify/ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;
  name: string = '';

  // Customize Sign Up Form Fields
  constructor(private ref: ChangeDetectorRef, private router: Router) {
    this.formFields = [
      {
        type: 'name',
        label: 'Name',
        placeholder: 'John Smith',
        required: true,
      },
      {
        type: 'email',
        label: 'Email',
        placeholder: 'name@domain.com',
        required: true,
      },
      {
        type: 'password',
        label: 'Password',
        placeholder: 'Must be at least 6 characters',
        required: true,
      },
    ];
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      // get current auth status (signed in / out)
      this.authState = authState;

      // get the authData Obj
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
