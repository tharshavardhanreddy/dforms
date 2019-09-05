import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickselectComponent } from './quickselect.component';

describe('QuickselectComponent', () => {
  let component: QuickselectComponent;
  let fixture: ComponentFixture<QuickselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
