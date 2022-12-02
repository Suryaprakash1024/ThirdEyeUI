import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectHomeComponent } from './object-home.component';

describe('ObjectHomeComponent', () => {
  let component: ObjectHomeComponent;
  let fixture: ComponentFixture<ObjectHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
