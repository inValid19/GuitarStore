import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddguitarComponent } from './addguitar.component';

describe('AddguitarComponent', () => {
  let component: AddguitarComponent;
  let fixture: ComponentFixture<AddguitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddguitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddguitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
