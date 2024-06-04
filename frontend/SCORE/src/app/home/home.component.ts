import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
  mostrarSenha: boolean = false;
  screenWidth: number = window.innerWidth;
  screenSubscription: Subscription | undefined;
  
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    const sessaoexpirada = localStorage.getItem('sessaoexpirada');
    if(sessaoexpirada == 'true')
    {
      this.showAlert("Sessão expirada. O usuário será obrigado a realizar a autenticação novamente.");  
      localStorage.setItem('sessaoexpirada', "false");
    }
    
    localStorage.setItem('Teladecadastro', "false");
    localStorage.setItem('ID', "");
    localStorage.setItem('jwtToken', "");
    const remember = localStorage.getItem('relembrar');
    this.rememberMe = remember === 'S';

    // Set up the screen size listener
    this.screenSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(() => {
        this.screenWidth = window.innerWidth;
      })
    ).subscribe();
    
    // Configura os campos de entrada somente se "relembrar" estiver definido como verdadeiro
    if (this.rememberMe) {
      setTimeout(() => {
        this.usernameInput!.nativeElement.value = localStorage.getItem('Email') || '';
        this.passwordInput!.nativeElement.value = localStorage.getItem('Senha') || '';
      });
    }
  
    // Carregar o script do Google Identity Services de forma assíncrona
    this.loadGoogleSignInScript();


  }
  
  toggleSenha()
  {
    this.mostrarSenha = !this.mostrarSenha; 
  }

  loadGoogleSignInScript() {
    // Carregar o script do Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);   
    this.apiService.autenticarUsuario("","");
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
          size: this.screenWidth < 600 ? 'small':'large',
          logo_alignment: 'left',
          width: this.screenWidth < 600 ? 200 : 500 
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
          foto: "../../assets/avatar 1.png"
        };          
  
        // Verificando se apiService está definido antes de fazer a chamada
        if (this.apiService) {
          
          const pIdentificador = await this.apiService.cadastrarUsuario2(dadosUsuario);          
          
          if(pIdentificador > 0) {
            
           
            localStorage.setItem('Usuario', dadosUsuario.nome);
            localStorage.setItem('ID', pIdentificador.toString());   
            localStorage.setItem('Email', "");
            localStorage.setItem('Senha', "");
            localStorage.setItem('relembrar', 'N');
            
            // Redirecionar para a tela inicial
            this.router.navigate(['/inicio']).then(() => {
              window.location.reload(); // Forçar atualização da página para garantir que os dados sejam exibidos corretamente
            });
          } 
          else if( pIdentificador === 0)
          {
            this.showAlert("Usuário não cadastrado pelo sistema do Google.");
          } 
          else
          {
            throw new Error("Sistema indisponível.");
          }
        } else {
          throw new Error("apiService.cadastrarUsuarioAutomatico não está definido.");
        }          
      } catch (error) {
        this.showAlert('Erro ao realizar o login. ' + error);
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
      await this.apiService.autenticarUsuario(nome, senha);
      const isValid = await this.apiService.validarUsuario(nome, senha);

      if (isValid > 0) {      
        
        if (this.rememberMe) {
          localStorage.setItem('Email', nome);
          localStorage.setItem('Senha', senha);
          localStorage.setItem('relembrar', 'S');
        }
        else
        {
          localStorage.setItem('Email', nome);
          localStorage.setItem('relembrar', 'N');
        }
        localStorage.setItem('ID', isValid.toString());
        
        this.router.navigate(['/inicio']);
        // Faça algo quando o usuário estiver autenticado, por exemplo, redirecionar para outra página
      } else {
        this.showAlert("Usuário ou senha inválido, tente novamente!")
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

  showAlert(message : string) {
    var alertBox = document.getElementById("customAlert");
    var alertMessage = document.getElementById("alertMessage");
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
