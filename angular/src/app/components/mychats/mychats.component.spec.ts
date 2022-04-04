import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MychatsComponent } from './mychats.component';

describe('MychatsComponent', () => {
  let component: MychatsComponent;
  let fixture: ComponentFixture<MychatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MychatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MychatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
