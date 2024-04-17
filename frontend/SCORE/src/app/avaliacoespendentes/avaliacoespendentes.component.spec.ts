import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoespendentesComponent } from './avaliacoespendentes.component';

describe('AvaliacoespendentesComponent', () => {
  let component: AvaliacoespendentesComponent;
  let fixture: ComponentFixture<AvaliacoespendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacoespendentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliacoespendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
