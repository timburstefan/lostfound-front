import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LostItemsComponent } from './pages/lost-items/lost-items.component';
import { FoundItemsComponent } from './pages/found-items/found-items.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoggedGuard] },
  {
    path: 'lost-items',
    component: LostItemsComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'found-items',
    component: FoundItemsComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
    canActivate: [LoggedGuard],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedGuard],
})
export class AppRoutingModule {}
