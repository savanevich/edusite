import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { NgProgress } from "ngx-progressbar";

import { AuthService } from '../auth/auth.service';
import { FETCH_USERS_URL, FETCH_USER_SKILLS, ADD_USER_SKILL, DELETE_USER_SKILL, EDIT_USER_SKILL } from './user.constants';
import { User } from './user';
import { NotificationService } from '../common/notification/notification.service';
import { Skill } from '../skills/skill';

@Injectable()
export class UserService {

  private authHeaders: Headers;
  private skills: Skill[];

  public user: User = new User(0, '', '', '', 1, '', '', [], []);
  public userChanged = new EventEmitter<User>();
  public getUserSkillsEvent = new EventEmitter<Skill[]>();

  constructor(
    private authService: AuthService,
    private http: Http,
    private notificationService: NotificationService,
    private progress: NgProgress
  ) {
    this.authHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.authService.getAuthToken()
    });
  }

  getUser() {
    return this.user;
  }

  getUserSkills() {
    return this.skills;
  }

  fetchUser(id: number) {
    if (id === this.authService.getAuthUserId()) {
      this.user = this.authService.getAuthUser();
      this.userChanged.emit(this.user);

      return;
    }

    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.get(`${FETCH_USERS_URL}/${id}`, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.user = response.data.user;
            this.userChanged.emit(this.user);
          }
        }), ((response) => {
          this.notificationService.notify(
            response.json().errors[0],
            'error'
          );
        })
      );
  }

  fetchUserSkills(userId: number) {
    const options = new RequestOptions({ headers: new Headers({
        'Content-Type': 'application/json'
    })});

    return this.http.get(`${FETCH_USER_SKILLS}`.replace(':userID', userId.toString()), options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.skills = response.data.skills;
            this.getUserSkillsEvent.emit(this.skills);
          }
        }), ((response) => {
          this.notificationService.notify(
            response.json().errors[0],
            'error'
          );
        })
      );
  }

  addSkillToUser(userId: number, skill: Skill) {
    const options = new RequestOptions({ headers: this.authHeaders });
    const body = {
      abilityName: skill.abilityName,
      level: skill.level,
      categoryID: skill.categoryID
    };
    this.progress.start();

    return this.http.post(ADD_USER_SKILL.replace(':userID', userId.toString()), body, options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.skills.push(response.data.skill);
          }
        }), ((response) => {
          this.notificationService.notify(
            'Failed added new skill.',
            'error'
          );
        })
      );
  }

  editSKill(userId: number, skill: Skill) {
    const options = new RequestOptions({ headers: this.authHeaders });
    const body = {
      abilityName: skill.ability.name,
      level: skill.level,
      categoryID: skill.ability.category.id
    };
    this.progress.start();

    return this.http.put(EDIT_USER_SKILL.replace(':userID', userId.toString()).replace(':skillID', skill.id.toString()), body, options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            const skillIndex = this.skills.indexOf(skill);
            this.skills[skillIndex] = response.data.skill;
            console.log(response.data.skill);
          }
        }), ((response) => {
          this.notificationService.notify(
            'Failed edit new skill.',
            'error'
          );
        })
      );
  }

  removeSkill(userId: number, skill: Skill) {
    const options = new RequestOptions({ headers: this.authHeaders });
    this.progress.start();

    return this.http.delete(DELETE_USER_SKILL.replace(':userID', userId.toString()).replace(':skillID', skill.id.toString()), options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            const skillIndex = this.skills.indexOf(skill);
            this.skills.splice(skillIndex, 1);
          }
        }), ((response) => {
          this.notificationService.notify(
            'Failed added new skill.',
            'error'
          );
        })
      );
  }
}
