import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { UserService } from '../../user.service';
import { Skill } from '../../../skills/skill';
import { Category } from '../../../categories/category';
import { CategoryService } from '../../../categories/category.service';
import {DialogComponent} from "../../../common/dialog/dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsProfileComponent implements OnInit {

  public addSkillForm: FormGroup;
  public userId: number;
  public userSkills: Skill[] = [];
  public showAddSkillForm: boolean = false;
  public categoriesData: Category[] = [];
  public editingSkillId: number = 0;

  private copyEditingSkill: Skill;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initAddingSkillForm();

    this.router.parent.params.subscribe((params) => {
      this.userId = +params['id'];
      this.userService.fetchUserSkills(this.userId);
    });

    this.userService.getUserSkillsEvent.subscribe((skills: Skill[]) => {
      this.userSkills = this.userService.getUserSkills();
    });

    this.userSkills = this.userService.getUserSkills();

    this.categoryService.fetchCategories();

    this.categoryService.categories.subscribe(
      (categoriesData: Category[]) => {
        this.categoriesData = categoriesData;
      }
    );
  }

  addSkill() {
    this.userService.addSkillToUser(this.userId, this.addSkillForm.value);
    this.addSkillForm.reset();
    this.showAddSkillForm = false;
  }

  editSkill(skill: Skill) {
    this.userService.editSKill(this.userId, skill);

    console.log(this.copyEditingSkill);
    this.copyEditingSkill = null;
    this.editingSkillId = 0;
  }

  removeSkill(skill: Skill) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete the skill',
        content: 'Are you sure you want to delete the skill?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.removeSkill(this.userId, skill);
      }
    });
  }

  showForm() {
    this.showAddSkillForm = !this.showAddSkillForm;
  }

  showEditForm(skill: Skill) {
    this.editingSkillId = skill.id;

    this.copyEditingSkill = _.cloneDeep(skill);
  }

  resetChanges(skill: Skill) {
    skill.ability.name = this.copyEditingSkill.ability.name;
    skill.ability.category.id = this.copyEditingSkill.ability.category.id;
    skill.level = this.copyEditingSkill.level;

    this.editingSkillId = 0;
    this.copyEditingSkill = null;
  }

  private initAddingSkillForm() {
    this.addSkillForm = this.formBuilder.group({
      abilityName: ['', [
        Validators.required
      ]],
      categoryID: [1, [
        Validators.required,
      ]],
      level: [1, [
        Validators.required,
      ]]
    });
  }
}
