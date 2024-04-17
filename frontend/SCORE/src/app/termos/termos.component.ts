import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Importe o serviço
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './termos.component.html',
  styleUrl: './termos.component.css'
})
export class TermosComponent {
  telacadastro: boolean = false;
  constructor(private router: Router, private apiService: ApiService) {}
  
  ngOnInit() {
    const Teladecadastroaux = localStorage.getItem('Teladecadastro');
    if(Teladecadastroaux == "true")
      this.telacadastro = true;
  }

  navigateToLogin() {
    this.router.navigate(['/home']);
  }

  TelaPrivacidade() {
    this.router.navigate(['/politicas']);
  }

  TelaCadastro(){
    this.router.navigate(['/cadastropessoa']);    
  }
}
