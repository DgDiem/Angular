import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproComponent } from './listpro.component';

describe('ListproComponent', () => {
  let component: ListproComponent;
  let fixture: ComponentFixture<ListproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListproComponent]
    });
    fixture = TestBed.createComponent(ListproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
