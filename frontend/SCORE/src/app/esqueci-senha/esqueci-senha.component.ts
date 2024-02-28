import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Importe o serviço

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {  
  
  @ViewChild('emailInput') emailInput: ElementRef | undefined;

  constructor(private router: Router, private apiService: ApiService) {}

  async enviarRecuperacaoSenha() {

    if (this.emailInput) {
      const email = this.emailInput?.nativeElement.value;
      
      if(email && email.trim() !== '')
      {
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'block';
        }

        const isValid = await this.apiService.enviarEmailRecuperacao(email); 

        if (modal) {
          modal.style.display = 'none';
        }
        
        if (isValid === 0)
        {
          alert('E-mail de recuperação enviado com sucesso!');
          this.emailInput.nativeElement.value = '';         
        }
        else if (isValid === 1)
        {
          alert('E-mail indicado não está cadastrado!');
          this.emailInput.nativeElement.value = '';         
        }
        else
        {
          alert('Falha ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
        }  
      }
      else
      {
        alert('Campo de e-mail tem que ser preenchido!');
      }
    }  
  }

  navigateToLogin() {
    this.router.navigate(['/home']);
  }
}
