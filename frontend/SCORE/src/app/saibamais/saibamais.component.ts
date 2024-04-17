import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Importe o serviço

@Component({
  selector: 'app-saibamais',
  standalone: true,
  imports: [],
  templateUrl: './saibamais.component.html',
  styleUrl: './saibamais.component.css'
})
export class SaibamaisComponent {
  constructor(private router: Router, private apiService: ApiService) {}
  
  navigateToLogin() {
    this.router.navigate(['/home']);
  }

  goBack(){
    this.router.navigate(['/politicas']);
  }
}
