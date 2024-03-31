import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheeventoComponent } from './detalheevento.component';

describe('DetalheeventoComponent', () => {
  let component: DetalheeventoComponent;
  let fixture: ComponentFixture<DetalheeventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheeventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
