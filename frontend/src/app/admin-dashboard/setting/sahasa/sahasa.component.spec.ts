import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SahasaComponent } from './sahasa.component';

describe('SahasaComponent', () => {
  let component: SahasaComponent;
  let fixture: ComponentFixture<SahasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SahasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SahasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
