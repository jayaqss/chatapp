import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedrawerComponent } from './sidedrawer.component';

describe('SidedrawerComponent', () => {
  let component: SidedrawerComponent;
  let fixture: ComponentFixture<SidedrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidedrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
