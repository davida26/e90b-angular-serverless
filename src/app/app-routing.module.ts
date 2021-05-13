import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ResearchComponent } from './research/research.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'login', component: AuthComponent },
  { path: 'new', component: PostFormComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'research', component: ResearchComponent, pathMatch: 'full' },
  { path: 'post/:id', component: ViewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
