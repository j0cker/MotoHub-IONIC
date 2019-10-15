import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergContactPage } from './emerg-contact.page';

describe('EmergContactPage', () => {
  let component: EmergContactPage;
  let fixture: ComponentFixture<EmergContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
