import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcateComponent } from './addcate.component';

describe('AddcateComponent', () => {
  let component: AddcateComponent;
  let fixture: ComponentFixture<AddcateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcateComponent]
    });
    fixture = TestBed.createComponent(AddcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
