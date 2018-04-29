import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/user/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthedGuard } from './modules/auth/authed.guard';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { ArticlesComponent } from './modules/user/profile/articles/articles.component';
import { EditProfileComponent } from './modules/user/profile/edit/edit.component';
import { CreateArticleComponent } from './modules/articles/create-article/create-article.component';
import { SkillsProfileComponent } from './modules/user/profile/skills/skills.component';
import { ArticleDetailsComponent } from './modules/articles/article-details/article-details.component';

export const ROUTES = [
  { path: 'auth/register', component: RegisterComponent, canActivate: [AuthedGuard] },
  { path: 'auth/login', component: LoginComponent, canActivate: [AuthedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: ProfileComponent, canActivate: [AuthGuard], children: [
    { path: '', component: ArticlesComponent },
    { path: 'edit', component: EditProfileComponent },
    { path: 'skills', component: SkillsProfileComponent }
  ]},
  { path: 'articles/create', component: CreateArticleComponent },
  { path: 'articles/:id/edit', component: CreateArticleComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent }
];
