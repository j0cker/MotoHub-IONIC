import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMotosPage } from './mis-motos.page';

describe('MisMotosPage', () => {
  let component: MisMotosPage;
  let fixture: ComponentFixture<MisMotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisMotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisMotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
