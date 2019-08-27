import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessageComponent } from './form-error-message.component';

describe('FormErrorMessageComponent', () => {
  let component: FormErrorMessageComponent;
  let fixture: ComponentFixture<FormErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorMessageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
