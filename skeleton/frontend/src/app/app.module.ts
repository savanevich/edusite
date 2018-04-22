import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { MatDialogModule, MatButtonModule } from '@angular/material';

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
import { CreateArticleComponent } from './modules/article/create-article/create-article.component';
import { ArticleService } from './modules/article/article.service';
import { CategoryService } from './modules/category/category.service';
import { ArticleComponent } from './modules/article/article/article.component';
import { DialogComponent } from './modules/common/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CreateArticleComponent,
    DashboardComponent,
    DialogComponent,
    EditProfileComponent,
    FollowComponent,
    LoginComponent,
    NotificationComponent,
    ProfileComponent,
    RegisterComponent,
    WallComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgProgressModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    ArticleService,
    AuthService,
    AuthGuard,
    AuthedGuard,
    CategoryService,
    FollowService,
    NotificationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
