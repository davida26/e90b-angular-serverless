import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
  FormFieldTypes,
} from '@aws-amplify/ui-components';
import { APIService } from './API.service';
import { Post } from '../types/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;
  name: string = '';

  // create form for posts
  public createForm: FormGroup;

  // Add posts, store in array
  // type definition
  posts: Array<Post>;

  // Customize Sign Up Form Fields
  // Add FormBuilder for post
  // Add API Service to get/send data
  constructor(
    private ref: ChangeDetectorRef,
    private api: APIService,
    private form: FormBuilder
  ) {
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

  async ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });

    this.api.ListPosts().then((event) => {
      this.posts = event.items;
    });

    this.createForm = this.form.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    // realtime data subscription for new posts
    this.api.OnCreatePostListener.subscribe((event: any) => {
      const newPost = event.value.data.onCreatePost;
      this.posts = [newPost, ...this.posts];
    });
  }

  public onCreate(post: Post) {
    this.api
      .CreatePost(post)
      .then((event) => {
        console.log('post created');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('Error Creating Post', e);
      });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
