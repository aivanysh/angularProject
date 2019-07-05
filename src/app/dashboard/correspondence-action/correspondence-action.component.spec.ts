import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenceActionComponent } from './correspondence-action.component';

describe('CorrespondenceActionComponent', () => {
  let component: CorrespondenceActionComponent;
  let fixture: ComponentFixture<CorrespondenceActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondenceActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondenceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
