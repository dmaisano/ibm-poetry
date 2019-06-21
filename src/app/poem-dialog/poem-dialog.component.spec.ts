import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemDialogComponent } from './poem-dialog.component';

describe('PoemDialogComponent', () => {
  let component: PoemDialogComponent;
  let fixture: ComponentFixture<PoemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
