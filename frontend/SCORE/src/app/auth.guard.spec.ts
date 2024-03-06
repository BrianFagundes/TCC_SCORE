import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false when user is not authenticated', () => {
    const routeMock: ActivatedRouteSnapshot = {} as any;
    const routeStateMock: RouterStateSnapshot = {} as any;
    // Chamada direta para canActivate, que retorna um booleano
    const result = guard.canActivate(routeMock, routeStateMock);
    // Agora, simplesmente verificamos o valor booleano retornado
    expect(result).toBeFalse(); // Ou use toBeFalsy() se preferir
  });

  // Adicione mais testes conforme necessário
});
