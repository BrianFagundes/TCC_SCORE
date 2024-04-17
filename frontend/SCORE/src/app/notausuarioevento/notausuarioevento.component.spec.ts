import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotausuarioeventoComponent } from './notausuarioevento.component';

describe('NotausuarioeventoComponent', () => {
  let component: NotausuarioeventoComponent;
  let fixture: ComponentFixture<NotausuarioeventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotausuarioeventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotausuarioeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
