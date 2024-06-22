import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproComponent } from './addpro.component';

describe('AddproComponent', () => {
  let component: AddproComponent;
  let fixture: ComponentFixture<AddproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproComponent]
    });
    fixture = TestBed.createComponent(AddproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
