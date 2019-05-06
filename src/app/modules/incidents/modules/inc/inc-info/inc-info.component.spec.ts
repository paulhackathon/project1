import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncInfoComponent } from './inc-info.component';

describe('IncInfoComponent', () => {
  let component: IncInfoComponent;
  let fixture: ComponentFixture<IncInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
