import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;
  @ViewChild('novaSenha') novaSenha: ElementRef | undefined;
  @ViewChild('confirmacaoSenha') confirmacaoSenha: ElementRef | undefined;


  mostrarSenha : boolean = false;
  editMode: boolean = false;
  imagePath: string = '';
  nomeUsuario: string = ''; // Variável para armazenar o nome do usuário
  IdUsuario: string = ''; // Variável para armazenar o email do usuário
  mostraNovaSenha: boolean =false;
  usuariogoogle: boolean=false;
  mostrarSenhaModal: boolean=false;
  mostrarconfSenhaModal: boolean=false;

  constructor(private router: Router, private apiService: ApiService) {  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
  }

  ngOnInit() {    
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');       
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem? Imagem.toString() : '../../assets/avatar 1.png';  
   
  }

  getBotaoEstilos()
  {
    if(this.usuariogoogle)
    {
      return {
        'width': '440px',
        // outros estilos conforme necessário
      };
    }
    else
    {
      return {
        'width': '150px',
        // outros estilos conforme necessário
      };
    }
  }

  ngAfterViewInit() {
    const ID = localStorage.getItem('ID');
    
    if (ID) {
      this.apiService.obterUsuarioPorId(ID.toString())
        .then(usuario => {
          // Aqui, "usuario" é o resultado da Promise, o objeto que você quer
          this.nomeInput!.nativeElement.value = usuario.nome; // Exemplo de acesso à propriedade "nome" do objeto usuário
          if(usuario.senha === "")
          {
            this.mostrarSenha = true;
            this.senhaInput!.nativeElement.value = "Usuário Criado pelo Google!"
            this.usuariogoogle = true;
          }          
          else
            this.senhaInput!.nativeElement.value = usuario.senha;
          this.emailInput!.nativeElement.value = usuario.email;
          // Você pode acessar outras propriedades do objeto usuário da mesma forma
        })
        .catch(error => {
          // Tratamento de erro se a Promise for rejeitada
          console.error('Erro ao obter o usuário:', error);
        });
    }
  }

  onImageSelected(event: any): void {
    if(this.editMode)
    {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Armazena na localStorage
          localStorage.setItem('userImage', e.target.result);
          localStorage.setItem('imageName', file.name);
          
          // Atualiza as imagens exibidas
          const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
          const selectedImage2 = document.getElementById('selectedImage2') as HTMLImageElement;
          if (selectedImage) {
            selectedImage.src = e.target.result;
          } 
          if (selectedImage2) {
            selectedImage2.src = e.target.result;
          }
        };
        reader.readAsDataURL(file);
        event.target.value = '';
      }
    }
  } 

  toggleSenha()
  {
    this.mostrarSenha = !this.mostrarSenha; 
  }

  toggleSenhaModal()
  {
    this.mostrarSenhaModal = !this.mostrarSenhaModal; 
  }

  toggleconfSenhaModal()
  {
    this.mostrarconfSenhaModal = !this.mostrarconfSenhaModal; 
  }

  toggleEdit() {
    
    this.editMode = !this.editMode;
    if(!this.usuariogoogle)
    {
      if(this.editMode === true)   
        this.mostrarSenha = false;
    }
  }

  cancelEdit() {
    // Lógica para cancelar a edição
    this.carregarDadosUsuario(); // Recarrega os dados originais do usuário
    this.toggleEdit(); // Sai do modo de edição
    const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
    const selectedImage2 = document.getElementById('selectedImage2') as HTMLImageElement;
    const imagemSrc = localStorage.getItem('imagem');
    
    if(!this.usuariogoogle)
    {
      this.mostraNovaSenha = false;
      this.mostrarSenha = false;
    }

    if (selectedImage && imagemSrc) {
      selectedImage.src = imagemSrc;
    }

    if (selectedImage2 && imagemSrc) {
      selectedImage2.src = imagemSrc;
    }
    const ID = localStorage.getItem('ID');
    
    if (ID) {
      this.apiService.obterUsuarioPorId(ID.toString())
        .then(usuario => {
          // Aqui, "usuario" é o resultado da Promise, o objeto que você quer
          this.nomeInput!.nativeElement.value = usuario.nome; // Exemplo de acesso à propriedade "nome" do objeto usuário
          if(usuario.senha === "")
          {
            this.mostrarSenha = true;
            this.senhaInput!.nativeElement.value = "Usuário Criado pelo Google!"
            this.usuariogoogle = true;
          }          
          else
            this.senhaInput!.nativeElement.value = usuario.senha;
          this.emailInput!.nativeElement.value = usuario.email;
          // Você pode acessar outras propriedades do objeto usuário da mesma forma
        })
        .catch(error => {
          // Tratamento de erro se a Promise for rejeitada
          console.error('Erro ao obter o usuário:', error);
        });
    }
  }

  saveChanges() {
    this.toggleEdit(); // Sai do modo de edição
    const nome = this.nomeInput?.nativeElement.value;
    const email = this.emailInput?.nativeElement.value;
    const ID = localStorage.getItem('ID');
    const novaSenha = localStorage.getItem('AltSenha');
    const foto = localStorage.getItem('userImage');

    if(nome && email && ID && foto && novaSenha)
      this.apiService.atualizarUsuario(ID, nome, email, foto, novaSenha);

    if(!this.usuariogoogle)
    {
      this.mostraNovaSenha = false;
      this.mostrarSenha = false;
    }

    localStorage.setItem('Usuario', nome);
    this.nomeUsuario = nome;
    alert('Gravado com sucesso');
  }

  deleteAccount() {
    const confirmation = confirm('Deseja de fato excluir a conta?');
    const ID = localStorage.getItem('ID');
    if(confirmation) {
      this.apiService.deletarUsuario(ID? ID.toString(): "")
      .then(() => {
        alert('Usuário deletado com sucesso!');    
          localStorage.setItem('imagem', "");
          localStorage.setItem('Usuario', "");
          localStorage.setItem('ID', "");
          this.router.navigate(['/home']); // Redireciona para a tela de login
        
      })
      .catch(error => {
        console.error('Erro ao deletar o usuário:', error);
        // Trate o erro conforme necessário
      });
    }
    
  }

  logout() {
    const confirmation = confirm('Deseja de fato fazer o log-off?');
    if(confirmation) {
      localStorage.setItem('imagem', "");
      localStorage.setItem('Usuario', "");
      localStorage.setItem('ID', "");
      this.router.navigate(['/home']); // Redireciona para a tela de login
    }
  }

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  cancelar() {
    if (confirm('Deseja cancelar a alteração de senha?')) {
      this.novaSenha!.nativeElement.value = '';
      this.novaSenha!.nativeElement.value = '';
      this.toggleModal();
    }
  }

  isEmailValido(email: string): boolean {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }

  alterarSenha() {
     
    const novaSenha = this.novaSenha?.nativeElement.value;
    const confirmacaoSenha = this.confirmacaoSenha?.nativeElement.value;
    if (novaSenha !== confirmacaoSenha) {
      alert('As senhas não correspondem.');
      return;
    } 
    
    if (novaSenha.length < 8) {
      alert('A senha possui menos de 8 caracteres.');
      return;
    }

    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexDigit = /\d/;
    const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (!regexUpperCase.test(novaSenha) || !regexLowerCase.test(novaSenha) || !regexDigit.test(novaSenha) || !regexSpecialChar.test(novaSenha)) {
      alert('A senha Deve possuir no minimo um caractere maiusculo, um caractere mnusculo, um caractere especial e/ou um numeral.');
      return;
    }

    alert("A senha foi armazenada para alteração, para que a alteração ocorra de fato, deve-se pressionar o botão gravar!");
    localStorage.setItem('AltSenha', novaSenha);
    this.senhaInput!.nativeElement.value = novaSenha;
    this.mostraNovaSenha = true;
    this.mostrarSenha = false;
    this.toggleModal();
  }

  TelaInicial(){
    this.router.navigate(['/inicio']);
  }
}
