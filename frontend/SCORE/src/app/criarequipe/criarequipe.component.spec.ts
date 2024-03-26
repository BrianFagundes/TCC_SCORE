import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarequipeComponent } from './criarequipe.component';

describe('CriarequipeComponent', () => {
  let component: CriarequipeComponent;
  let fixture: ComponentFixture<CriarequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarequipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
