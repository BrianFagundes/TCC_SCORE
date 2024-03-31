import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriareventoComponent } from './criarevento.component';

describe('CriareventoComponent', () => {
  let component: CriareventoComponent;
  let fixture: ComponentFixture<CriareventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriareventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
