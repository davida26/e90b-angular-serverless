import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Post } from '../../types/post';
import {
  onAuthUIStateChange,
  AuthState,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
  providers: [APIService],
})
export class ListPostsComponent implements OnInit {
  posts: Array<Post>;
  authState: AuthState;
  user: CognitoUserInterface | undefined;
  constructor(private api: APIService) {}

  ngOnInit() {
    this.api.ListPosts().then((posts) => {
      this.posts = posts.items;
    });

    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
