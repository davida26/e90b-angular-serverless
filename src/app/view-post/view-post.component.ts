import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../API.service';
import { Post } from '../../types/post';
import {
  onAuthUIStateChange,
  AuthState,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  post: any = [];
  authState: AuthState;
  user: CognitoUserInterface | undefined;
  editing: boolean = false;
  mapId: any = '';
  id: string = '';
  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // run once component has been created
  ngOnInit(): void {
    this.getPost();

    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
    });
  }

  setEditMode(mode): void {
    this.editing = mode ? true : false;
  }

  public updatePost(post: Post) {
    this.api
      .UpdatePost(post)
      .then((event) => {
        location.reload();
      })
      .catch((e) => {
        console.log('Error Creating Post', e);
      });
  }

  public deletePost(id) {
    console.log(id);
    this.api
      .DeletePost({ id })
      .then((event) => {
        location.href = '/research';
      })
      .catch((e) => {
        console.log('Error Creating Post', e);
      });
  }

  getPost(): void {
    // Map of the parameters that came through in route, returns Observable
    // take snapshot of current route (skip Observable) and get id
    const param = this.route.snapshot.paramMap.get('id');

    this.api.GetPost(param).then((post) => {
      this.post = post;
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
