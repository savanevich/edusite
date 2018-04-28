import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsProfileComponent } from './skills.component';

describe('SkillsProfileComponent', () => {
  let component: SkillsProfileComponent;
  let fixture: ComponentFixture<SkillsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
