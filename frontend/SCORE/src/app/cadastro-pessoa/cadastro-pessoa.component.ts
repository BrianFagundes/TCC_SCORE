import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

interface DadosUsuario {
  nome: string;
  email: string;
  senha: string;
  identificador: string;
  foto: string;
}

@Component({
  selector: 'app-cadastro-pessoa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent {
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;
  @ViewChild('senha2Input') senha2Input: ElementRef | undefined;
  @ViewChild('codigo') codigo: ElementRef | undefined;
  
  mostrarSenha: boolean = false;
  mostrarConfSenha: boolean = false;
  Aceito: boolean = false;
  confirmaremail: boolean = false;
  dadosUsuario : DadosUsuario;

  constructor(private router: Router, private apiService: ApiService) {
    this.dadosUsuario = {
            nome: '',
            email: '',
            senha: '',
            identificador: '',
            foto: '../../assets/avatar 1.png'
        };
  }


  ngOnInit(){
    localStorage.setItem('Teladecadastro', "true");
    this.confirmaremail = false;
  }

  async cadastrarUsuario(){
    
  
    function isEmailValido(email: string): boolean {
      const regexEmail = /\S+@\S+\.\S+/;
      return regexEmail.test(email);
    }

    const nome = this.nomeInput?.nativeElement.value;
    const email= this.emailInput?.nativeElement.value;
    const senha= this.senhaInput?.nativeElement.value;
    const senha2= this.senha2Input?.nativeElement.value;

    // Construa o objeto de dados para enviar para a API
    this.dadosUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      identificador: "",
      foto: "../../assets/avatar 1.png"
    };

    var erro = '';

    if (!isEmailValido(email))
    {
      this.showAlert('O e-mail está em um formato inválido.');
      return;
    }
    // Verifique se as senhas coincidem
    if (senha !== senha2) {
      this.showAlert('As senhas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      this.showAlert('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexDigit = /\d/;
    const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (!regexUpperCase.test(senha) || !regexLowerCase.test(senha) || !regexDigit.test(senha) || !regexSpecialChar.test(senha)) {
      this.showAlert('A senha deve possuir, no mínimo, um caractere maiúsculo, um caractere minúsculo, um caractere especial e um numeral.');
      return;
    }

    if(!this.Aceito)
    {
      this.showAlert("Para se cadastrar no sistema, o usuário deve concordar com as Políticas de Privacidade e os Termos de Serviço.");
      return;
    }
    this.confirmaremail = true;
    const codigo = this.generateRandomCode();
    localStorage.setItem('codigo', codigo);  

    this.apiService.enviarEmailRecuperacao2(this.dadosUsuario.email,codigo);     
  }

  async cadastrarDados(){

    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }    

    
    await this.apiService.autenticarUsuario("","");

    const isValid = await this.apiService.cadastrarUsuario(this.dadosUsuario);     
    
    if((this.nomeInput) && (this.emailInput) && (this.senhaInput) &&(this.senha2Input))
    {
      if (isValid === 0)
      {
        this.showAlert('Cadastro realizado com sucesso!');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';   
        this.navigateToHome();     
      }
      else if (isValid === 1)
      {
        this.showAlert('E-mail já cadastrado no sistema.');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';         
      }
      else if (isValid === 2)
      {
        this.showAlert('Usuário já cadastrado no sistema.');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';         
      }
      else
      {
        this.showAlert('Falha ao realizar o cadastro. Por favor, tente novamente mais tarde.');
      }  
    }

   
    if (modal) {
      modal.style.display = 'none';
    }

    this.confirmaremail = false;
  }

  generateRandomCode(): string {
    let code: string = "";
    const digits = "0123456789";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits[randomIndex];
    }
    return code;
}
  
  toggleSenha()
  {
    this.mostrarSenha = !this.mostrarSenha; 
  }

  toggleConfSenha()
  {
    this.mostrarConfSenha = !this.mostrarConfSenha; 
  }

  
  
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  alteraraceito(){
    this.Aceito = !this.Aceito;    
  }

  fecharModal() {
    this.confirmaremail = false;
  }

  ConfirmarEmail(){    
    const validacao = localStorage.getItem('codigo');
    if(this.codigo?.nativeElement.value == validacao)
      this.cadastrarDados();
    else
    {
      this.showAlert("Validação inválida. Cadastramento cancelado.");
      this.confirmaremail = false;
    }      
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