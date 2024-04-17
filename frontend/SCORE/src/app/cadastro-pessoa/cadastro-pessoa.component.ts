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
      alert('Email em formato inválido!');
      return;
    }
    // Verifique se as senhas coincidem
    if (senha !== senha2) {
      alert('As senhas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      alert('A senha possui menos de 8 caracteres.');
      return;
    }

    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexDigit = /\d/;
    const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (!regexUpperCase.test(senha) || !regexLowerCase.test(senha) || !regexDigit.test(senha) || !regexSpecialChar.test(senha)) {
      alert('A senha Deve possuir no minimo um caractere maiusculo, um caractere mnusculo, um caractere especial e/ou um numeral.');
      return;
    }

    if(!this.Aceito)
    {
      alert("O usuário deve concordar com as Políticas de Privacidade e os Termos de Serviço para conseguir cadastrar-se no sistema!");
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
    
    this.apiService.autenticarUsuario();

    const isValid = await this.apiService.cadastrarUsuario(this.dadosUsuario);     
    
    if((this.nomeInput) && (this.emailInput) && (this.senhaInput) &&(this.senha2Input))
    {
      if (isValid === 0)
      {
        alert('Cadastro Realizado com sucesso!');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';        
      }
      else if (isValid === 1)
      {
        alert('E-mail já cadastrado no sistema!');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';         
      }
      else if (isValid === 2)
      {
        alert('Usuário já cadastrado no sistema!');
        this.nomeInput.nativeElement.value = ''; 
        this.emailInput.nativeElement.value = '';
        this.senhaInput.nativeElement.value = '';
        this.senha2Input.nativeElement.value = '';         
      }
      else
      {
        alert('Falha ao Realizar o cadastro. Por favor, tente novamente mais tarde.');
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
      alert("Validação inválida! Cadastramento cancelado!");
      this.confirmaremail = false;
    }      
  }
}