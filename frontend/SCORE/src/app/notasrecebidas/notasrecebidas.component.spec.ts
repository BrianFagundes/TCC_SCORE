import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasrecebidasComponent } from './notasrecebidas.component';

describe('NotasrecebidasComponent', () => {
  let component: NotasrecebidasComponent;
  let fixture: ComponentFixture<NotasrecebidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasrecebidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotasrecebidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
