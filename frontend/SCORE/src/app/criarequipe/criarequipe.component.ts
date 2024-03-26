import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-criarequipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './criarequipe.component.html',
  styleUrl: './criarequipe.component.css'
})
export class CriarequipeComponent {
  @ViewChild('nomeEquipe') nomeEquipe: ElementRef | undefined;
  @ViewChild('procura') procura: ElementRef | undefined;

  equipes: {
    id: number,
    nome: string,
    foto: string,
    sigla: string,
    informacoes: string,
    nomeparametro1: string,
    nomeparametro2: string,
    nomeparametro3: string,
    nomeparametro4: string,
    nomeparametro5: string,
    nomeparametro6: string,
    nomeparametro7: string,
    nomeparametro8: string,
    nomeparametro9: string,
    nomeparametro10: string,
    nomeparametro11: string,
    nomeparametro12: string,
    nomeparametro13: string,
    nomeparametro14: string,
    nomeparametro15: string,
    nomeparametro16: string,
    nomeparametro17: string,
    nomeparametro18: string,
    nomeparametro19: string,
    nomeparametro20: string,
    moderador: number
  }[] = [];

  equipes2: {
    id: number,
    nome: string,
    foto: string,
    sigla: string,
    informacoes: string,
    nomeparametro1: string,
    nomeparametro2: string,
    nomeparametro3: string,
    nomeparametro4: string,
    nomeparametro5: string,
    nomeparametro6: string,
    nomeparametro7: string,
    nomeparametro8: string,
    nomeparametro9: string,
    nomeparametro10: string,
    nomeparametro11: string,
    nomeparametro12: string,
    nomeparametro13: string,
    nomeparametro14: string,
    nomeparametro15: string,
    nomeparametro16: string,
    nomeparametro17: string,
    nomeparametro18: string,
    nomeparametro19: string,
    nomeparametro20: string,
    moderador: number
  }[] = [];

  equipesPorPagina = 3;
  paginaAtual = 1;
  exibirModal = false;


  mostrarSenha: boolean = false;
  editMode: boolean = false;
  imagePath: string = '';
  nomeUsuario: string = ''; // Variável para armazenar o nome do usuário
  IdUsuario: string = ''; // Variável para armazenar o email do usuário
  mostraNovaSenha: boolean = false;
  usuariogoogle: boolean = false;
  mostrarSenhaModal: boolean = false;
  mostrarconfSenhaModal: boolean = false;
  filtrou: boolean = false;
  existe: boolean = false;



  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
  }

  ngOnInit() {
    this.carregarDadosUsuario();
    this.carregarEquipes();
  }

  carregarDadosUsuario() {
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';

  }

  async carregarEquipes() {
    try {
      const ID = localStorage.getItem('ID');

      const equipes = await this.apiService.obterTodasEquipes(ID?.toString() ? ID?.toString() : ""); // Ajuste o nome do método conforme sua implementação

      equipes.forEach(element => {
        this.equipes.push({
          id: element.id,
          nome: element.nome,
          foto: element.foto,
          sigla: element.sigla,
          informacoes: element.informacoes,
          nomeparametro1: element.nomeparametro1,
          nomeparametro2: element.nomeparametro2,
          nomeparametro3: element.nomeparametro3,
          nomeparametro4: element.nomeparametro4,
          nomeparametro5: element.nomeparametro5,
          nomeparametro6: element.nomeparametro6,
          nomeparametro7: element.nomeparametro7,
          nomeparametro8: element.nomeparametro8,
          nomeparametro9: element.nomeparametro9,
          nomeparametro10: element.nomeparametro10,
          nomeparametro11: element.nomeparametro11,
          nomeparametro12: element.nomeparametro12,
          nomeparametro13: element.nomeparametro13,
          nomeparametro14: element.nomeparametro14,
          nomeparametro15: element.nomeparametro15,
          nomeparametro16: element.nomeparametro16,
          nomeparametro17: element.nomeparametro17,
          nomeparametro18: element.nomeparametro18,
          nomeparametro19: element.nomeparametro19,
          nomeparametro20: element.nomeparametro20,
          moderador: element.moderador
        });
      });

    } catch (error) {
      console.error('Erro ao carregar equipes:', error);
    }
  }

  usuario() {
    this.router.navigate(['/usuario']);
  }

  logout() {
    const confirmation = confirm('Deseja de fato fazer o log-off?');
    if (confirmation) {
      localStorage.setItem('imagem', "");
      localStorage.setItem('Usuario', "");
      localStorage.setItem('ID', "");
      this.router.navigate(['/home']); // Redireciona para a tela de login
    }
  }

  get equipesNaPaginaAtual() {
    const inicio = (this.paginaAtual - 1) * this.equipesPorPagina;
    const fim = inicio + this.equipesPorPagina;
    return this.equipes.slice(inicio, fim);
  }

  get equipesNaPaginaAtual2() {
    const inicio = (this.paginaAtual - 1) * this.equipesPorPagina;
    const fim = inicio + this.equipesPorPagina;
    return this.equipes2.slice(inicio, fim);
  }

  criarNovaEquipe() {
    if (this.equipes.length <= 99) {
      this.abrirModal()
    }
    else
      alert("O usuário pode ter no máximo 100 equipes!");
  }

  mudarPagina(numero: number) {
    this.paginaAtual += numero;
    // Certifique-se de não ultrapassar o número total de páginas ou ir abaixo da página 1
    this.paginaAtual = Math.max(1, Math.min(this.paginaAtual, Math.ceil(this.equipes.length / this.equipesPorPagina)));
  }

  get totalDePaginas() {
    return Math.ceil(this.equipes.length / this.equipesPorPagina);
  }

  get totalDePaginas2() {
    return Math.ceil(this.equipes2.length / this.equipesPorPagina);
  }

  fecharModal() {
    this.exibirModal = false;
  }

  abrirModal() {
    this.exibirModal = true;
  }


  confirmarCancelar() {
    if (confirm('Gostaria de Cancelar a criação da Equipe?')) {
      this.fecharModal();
    }
  }

  async confirmarCriacao() {
    const ID = localStorage.getItem('ID');
    if (confirm(`Gostaria de Criar a nova equipe com o nome: ${this.nomeEquipe?.nativeElement.value}?`)) {
      const dadosEmpresa = {
        nome: this.nomeEquipe?.nativeElement.value,
        foto: '../../assets/upload.png',
        sigla: '',
        informacoes: '',
        quantidadeintegrantes: 0,
        nomeparametro1: '',
        nomeparametro2: '',
        nomeparametro3: '',
        nomeparametro4: '',
        nomeparametro5: '',
        nomeparametro6: '',
        nomeparametro7: '',
        nomeparametro8: '',
        nomeparametro9: '',
        nomeparametro10: '',
        nomeparametro11: '',
        nomeparametro12: '',
        nomeparametro13: '',
        nomeparametro14: '',
        nomeparametro15: '',
        nomeparametro16: '',
        nomeparametro17: '',
        nomeparametro18: '',
        nomeparametro19: '',
        nomeparametro20: '',
        moderador: ID
      };

      const isValid = await this.apiService.CriarEquipe(dadosEmpresa);

      if (isValid !== 0) {
        if (isValid == 1)
          alert("Erro ao realizar a inclusão!");
        else if (isValid == -1) {
          alert("Falha de conexão com a API!")
        }
      }
      else
        alert("Inclusão da equipe realizada com sucesso!")

      this.fecharModal();
      this.nomeEquipe!.nativeElement.value = ''; // Limpar o nome da equipe para futuras criações
      this.equipes = [];
      this.carregarEquipes();
    }
  }

  excluirEquipe(index: number, nome: string) {

    if (confirm('Tem certeza que deseja excluir a equipe ' + nome + '?')) {
      this.apiService.deletarEquipe(index.toString())
        .then(() => {
          alert('Equipe ' + nome + ' deletada com sucesso!');
          this.equipes = [];

          setTimeout(() => {
            this.carregarEquipes();
          }, 0);

          this.validarequipes2(index);

        })
    }
  }

  Teladetalhes(idtela: string, tipo: string) {
    localStorage.setItem('idtela', idtela);
    localStorage.setItem('tipo', tipo);
    this.router.navigate(['/detalhes']);
  }

  async onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Marque a função de callback como async
      reader.onload = async (e: any) => {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        if (selectedImage) {
          selectedImage.src = e.target.result;
        }

        // Agora você pode usar await dentro da função de callback
        await this.apiService.carregarimagem(index.toString(), e.target.result);

        this.equipes = [];
        await this.carregarEquipes(); // Assumindo que carregarEquipes é uma função assíncrona
      };

      reader.readAsDataURL(file);
      event.target.value = '';
    }

  }

  TelaInicial() {
    this.router.navigate(['/inicio']);
  }

  botaopesquisarlistaEquipes() {
    this.paginaAtual = 1;
    this.equipes2 = [];
    const valorProcura = this.procura?.nativeElement.value.trim();
    if (valorProcura) {
      if (valorProcura.length > 0) {
        this.filtrou = true;
        const resultado = parseInt(valorProcura);       
        if (!isNaN(resultado)) {          
          this.equipes2 = this.equipes.filter(equipe => equipe.id.toString() === valorProcura.toString());
          if (this.equipes2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
        else {
          this.equipes2 = this.equipes.filter(equipe => equipe.nome.toLowerCase() === valorProcura.toLowerCase());
          if (this.equipes2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
      }
    }
  }

  LimpapesquisarlistaEquipes() {
    this.paginaAtual = 1;
    this.filtrou = false;
    this.procura!.nativeElement.value = "";
  }

  validarequipes2(index: number) {
    var indice = 0;
    indice = this.equipes2.findIndex(a => a.id === index);
    if (indice >= 0) {
      this.equipes2.splice(indice, 1);
    }
    if (this.equipes2.length == 0) {
      this.existe = false;
    }
    else {
      this.existe = true;
    }
  }





}

