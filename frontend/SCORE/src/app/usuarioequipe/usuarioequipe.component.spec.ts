import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioequipeComponent } from './usuarioequipe.component';

describe('UsuarioequipeComponent', () => {
  let component: UsuarioequipeComponent;
  let fixture: ComponentFixture<UsuarioequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioequipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
