import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSnackbarComponent } from './input-snackbar.component';

describe('InputSnackbarComponent', () => {
  let component: InputSnackbarComponent;
  let fixture: ComponentFixture<InputSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
