import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Importe o serviço
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.css'
})
export class PoliticasComponent {
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

  learnMore(){
    this.router.navigate(['/saibamais']);    
  }
  
  TelaTermos(){
    this.router.navigate(['/termos']);    
  }

  TelaCadastro(){
    this.router.navigate(['/cadastropessoa']);    
  }
}
