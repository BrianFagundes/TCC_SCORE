import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoparticipantesComponent } from './avaliacaoparticipantes.component';

describe('AvaliacaoparticipantesComponent', () => {
  let component: AvaliacaoparticipantesComponent;
  let fixture: ComponentFixture<AvaliacaoparticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoparticipantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliacaoparticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
