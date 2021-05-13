import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';
import { Post } from '../../types/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  // create form for posts
  public createForm: FormGroup;

  // Add posts, store in array
  // type definition
  posts: Array<Post>;

  constructor(
    private api: APIService,
    private form: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.form.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onCreate(post: Post) {
    this.api
      .CreatePost(post)
      .then((event) => {
        console.log('post created');
        this.createForm.reset();
        this.router.navigate(['research']);
      })
      .catch((e) => {
        console.log('Error Creating Post', e);
      });
  }
}
