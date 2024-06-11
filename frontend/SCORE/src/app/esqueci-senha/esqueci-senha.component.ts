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

  ngOnInit(){    
    localStorage.setItem('Teladecadastro', "false");
  }

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
          this.showAlert('E-mail de recuperação enviado com sucesso.');
          this.emailInput.nativeElement.value = '';         
        }
        else if (isValid === 1)
        {
          this.showAlert('E-mail indicado não está cadastrado.');
          this.emailInput.nativeElement.value = '';         
        }
        else if (isValid === 2)
        {
          this.showAlert('E-mail indicado foi cadastrado pelo sistema do Google.');
          this.emailInput.nativeElement.value = '';         
        }
        else
        {
          this.showAlert('Falha ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
        }  
      }
      else
      {
        this.showAlert('O campo de e-mail deve ser preenchido.');
      }
    }  
  }

  navigateToLogin() {
    this.router.navigate(['/home']);
  }

  showAlert(message : string) {
    var alertBox = document.getElementById("customAlert");
    var alertMessage = document.getElementById("alertmessage_customAlert");
    var overlay_alertBox = document.getElementById("overlay_alertBox");
  
    if(alertBox && alertMessage && overlay_alertBox)
    {
      alertMessage.textContent = message;
      overlay_alertBox.style.display = "block"; // Show the overlay_alertBox
      alertBox.style.display = "block"; // Show the alert
    }
    
  }
  
  hideAlert() {
    var alertBox = document.getElementById("customAlert");
    var overlay_alertBox = document.getElementById("overlay_alertBox");
  
    if(alertBox && overlay_alertBox)
    {
      alertBox.style.display = "none"; // Hide the alert
      overlay_alertBox.style.display = "none"; // Hide the overlay_alertBox
    }
  }


}
