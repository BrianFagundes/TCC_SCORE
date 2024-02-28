import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

// Declaração do tipo global para o objeto 'google'
declare global {
  interface Window { google: any; }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('usernameInput') usernameInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  rememberMe: boolean = false;
  
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    const remember = localStorage.getItem('relembrar');
    this.rememberMe = remember === 'S';

    // Carregar o script do Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);   

    script.onload = () => {
      // Configurar o botão de login do Google
      window.google.accounts.id.initialize({
        client_id: '216698858853-049c41hi0olaup9kghg9u69151h3ceui.apps.googleusercontent.com',
        callback: this.handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        {
          type: 'standard',
          shape: 'pill',
          theme: 'filled_blue',
          text: 'signin_with',
          size: 'large',
          logo_alignment: 'left',
          width: 500
        }
      );
    };
  }

  handleCredentialResponse = async (response: any) => {    
    if (response.credential) {
      try {
        const tokenParts = response.credential.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        
        const dadosUsuario = {
          nome: payload.name,
          email: payload.email,
          senha: "",
          identificador: payload.sub,
          foto: payload.picture
        };          
  
        // Verificando se apiService está definido antes de fazer a chamada
        if (this.apiService) {
          const pIdentificador = await this.apiService.cadastrarUsuario2(dadosUsuario);
          if(pIdentificador !== 0) {
            localStorage.setItem('Usuario', dadosUsuario.nome);
            localStorage.setItem('ID', pIdentificador.toString());   
  
            // Redirecionar para a tela inicial
            this.router.navigate(['/inicio']).then(() => {
              window.location.reload(); // Forçar atualização da página para garantir que os dados sejam exibidos corretamente
            });
          } 
          else
          {
            alert("Usuário não cadastrado pelo sistema do Google/Facebook!")
          } 
        } else {
          throw new Error("apiService.cadastrarUsuarioAutomatico não está definido.");
        }          
      } catch (error) {
        alert('Erro ao realizar o login: ' + error);
      }   
    }
  }
  

  navigateToCadastro() {
    this.router.navigate(['/cadastropessoa']);
  }

  navigateToEsqueci(){
    this.router.navigate(['/Esqueci']);
  }
  
  async Login() {
    try {
      const nome = this.usernameInput?.nativeElement.value;
      const senha = this.passwordInput?.nativeElement.value;
      
      const isValid = await this.apiService.validarUsuario(nome, senha);
      
      if (isValid > 0) {
        const isValid2 = await this.apiService.LevantaNomeUsuario(isValid.toString());
        
        if (this.rememberMe) {
          localStorage.setItem('Usuario', isValid2.toString());
          localStorage.setItem('Senha', senha);
          localStorage.setItem('relembrar', 'S');
        }
        else
        {
          localStorage.setItem('Usuario', isValid2.toString());
          localStorage.setItem('relembrar', 'N');
        }
        localStorage.setItem('ID', isValid.toString());
        this.router.navigate(['/inicio']);
        // Faça algo quando o usuário estiver autenticado, por exemplo, redirecionar para outra página
      } else {
        alert("Usuário ou senha inválido, tente novamente!")
        // Faça algo quando o usuário não estiver autenticado
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Faça algo em caso de erro
    }
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
}
