import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSaludPage } from './registro-salud.page';

describe('RegistroSaludPage', () => {
  let component: RegistroSaludPage;
  let fixture: ComponentFixture<RegistroSaludPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroSaludPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
