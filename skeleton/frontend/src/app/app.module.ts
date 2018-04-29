import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { MatDialogModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { ProgressBarModule } from 'angular-progress-bar';
import { TagInputModule } from 'ngx-chips';


import { ROUTES } from './routes';

import { AuthService } from './modules/auth/auth.service';
import { UserService } from './modules/user/user.service';
import { NotificationService } from './modules/common/notification/notification.service';

import { AuthGuard } from './modules/auth/auth.guard';
import { AuthedGuard } from './modules/auth/authed.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/user/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotificationComponent } from './modules/common/notification/notification.component';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { ArticlesComponent } from './modules/user/profile/articles/articles.component';
import { EditProfileComponent } from './modules/user/profile/edit/edit.component';
import { FollowComponent } from './modules/user/profile/follow/follow.component';
import { FollowService } from './modules/user/profile/follow/follow.service';
import { CreateArticleComponent } from './modules/articles/create-article/create-article.component';
import { ArticleService } from './modules/articles/article.service';
import { CategoryService } from './modules/categories/category.service';
import { ArticleComponent } from './modules/articles/article/article.component';
import { DialogComponent } from './modules/common/dialog/dialog.component';
import { SkillsProfileComponent } from './modules/user/profile/skills/skills.component';
import { ArticleDetailsComponent } from './modules/articles/article-details/article-details.component';
import { FooterComponent } from './modules/common/footer/footer.component';
import { SidebarComponent } from './modules/articles/article-details/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    ArticlesComponent,
    CreateArticleComponent,
    DashboardComponent,
    DialogComponent,
    EditProfileComponent,
    FollowComponent,
    FooterComponent,
    LoginComponent,
    NotificationComponent,
    ProfileComponent,
    RegisterComponent,
    SidebarComponent,
    SkillsProfileComponent
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
    MatButtonModule,
    MatTabsModule,
    ProgressBarModule,
    TagInputModule
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
