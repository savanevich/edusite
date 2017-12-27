import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgProgressModule } from 'ngx-progressbar';

import { ROUTES } from './routes';

import { AuthService } from './modules/auth/auth.service';
import { UserService } from './modules/user/user.service';
import { NotificationService } from './modules/notification/notification.service';

import { AuthGuard } from './modules/auth/auth.guard';
import { AuthedGuard } from './modules/auth/authed.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { WallComponent } from './modules/user/profile/wall/wall.component';
import { EditProfileComponent } from './modules/user/profile/edit/edit.component';
import { FollowComponent } from './modules/user/profile/follow/follow.component';
import { FollowService } from './modules/user/profile/follow/follow.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotificationComponent,
    ProfileComponent,
    WallComponent,
    EditProfileComponent,
    FollowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgProgressModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthedGuard,
    FollowService,
    NotificationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
