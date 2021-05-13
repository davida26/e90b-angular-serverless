import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* add form */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { PostFormComponent } from './post-form/post-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ResearchComponent } from './research/research.component';
import { ViewPostComponent } from './view-post/view-post.component';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    AuthComponent,
    ListPostsComponent,
    ResearchComponent,
    ViewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent],
})
export class AppModule {}
