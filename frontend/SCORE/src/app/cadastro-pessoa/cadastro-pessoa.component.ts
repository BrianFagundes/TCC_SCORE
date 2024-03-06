import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service'; // Substitua pelo caminho real do seu serviço
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent {
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;
  @ViewChild('senha2Input') senha2Input: ElementRef | undefined;
  mostrarSenha: boolean = false;
  mostrarConfSenha: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  async cadastrarUsuario(){
    
  
    function isEmailValido(email: string): boolean {
      const regexEmail = /\S+@\S+\.\S+/;
      return regexEmail.test(email);
    }

    const nome = this.nomeInput?.nativeElement.value;
    const email= this.emailInput?.nativeElement.value;
    const senha= this.senhaInput?.nativeElement.value;
    const senha2= this.senha2Input?.nativeElement.value;


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

    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }

    // Construa o objeto de dados para enviar para a API
    const dadosUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      identificador: "",
      foto: "../../assets/avatar 1.png"
    };

    const isValid = await this.apiService.cadastrarUsuario(dadosUsuario);     
    
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
}