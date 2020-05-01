import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewguitarComponent } from './viewguitar.component';

describe('ViewguitarComponent', () => {
  let component: ViewguitarComponent;
  let fixture: ComponentFixture<ViewguitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewguitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewguitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
