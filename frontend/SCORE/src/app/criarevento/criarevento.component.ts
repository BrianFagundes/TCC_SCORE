import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-criarevento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './criarevento.component.html',
  styleUrl: './criarevento.component.css'
})
export class CriareventoComponent {
  @ViewChild('nomeEvento') nomeEvento: ElementRef | undefined;
  @ViewChild('procura') procura: ElementRef | undefined;
  @ViewChild('procura2') procura2: ElementRef | undefined;
  @ViewChild('equipe') equipe: ElementRef | undefined;



  Eventos: {
    id: number,
    equipe: string,
    nome: string,
    local: string,
    peridiocidade: string,
    dia: string,
    hora: string,
    quantidade_time: number,
    ImagemEquipe: string,
    nomeequipe: string,
    idequipe: string
  }[] = [];

  Eventos2: {
    id: number,
    equipe: string,
    nome: string,
    local: string,
    peridiocidade: string,
    dia: string,
    hora: string,
    quantidade_time: number,
    ImagemEquipe: string,
    nomeequipe: string,
    idequipe: string
  }[] = [];

  EventosPorPagina = 3;
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
  filtrou2: boolean = false;
  selecionada: boolean = false;
  existe: boolean = false;
  existenalistaequipes: boolean = false;
  existenalistaequipes2: boolean = false;
  imagempesquisalistaequipe: string = '';
  idpesquisalistaequipe: string = '';
  nomepesquisalistaequipe: string = '';
  imagempesquisalistaequipeselecionado: string = '';
  idpesquisalistaequipeselecionado: string = '';
  nomepesquisalistaequipeselecionado: string = '';
  equipeevento: boolean = false;

  equipes: {
    id: string,
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
    id: string,
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



  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
  }

  async ngOnInit() {
    this.carregarDadosUsuario();
    await this.carregarEquipes();
    this.carregarEventos();
  }

  carregarDadosUsuario() {
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';

  }

  async carregarEventos() {
    try {
      if (this.equipes.length > 0) {
        for (const element of this.equipes) {

          const Eventos = await this.apiService.obterTodosEventos(element.id); // Ajuste o nome do método conforme sua implementação

          for (const evento of Eventos) {
            this.Eventos.push({
              id: evento.id,
              equipe: evento.equipe.toString(),
              nome: evento.nome,
              local: evento.local,
              peridiocidade: evento.peridiocidade,
              dia: evento.dia,
              hora: evento.hora,
              quantidade_time: evento.quantidade_time,
              ImagemEquipe: element.foto,
              nomeequipe: element.nome, 
              idequipe: element.id,
            });
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar Eventos:', error);
    }
  }

  async carregarEquipes() {
    try {
      const ID = localStorage.getItem('ID');

      const equipes = await this.apiService.obterTodasEquipes(ID?.toString() ? ID?.toString() : ""); // Ajuste o nome do método conforme sua implementação

      equipes.forEach(element => {
        if (element.sigla.length > 0) {
          this.equipes.push({
            id: element.id.toString(),
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
        }
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

  get EventosNaPaginaAtual() {
    const inicio = (this.paginaAtual - 1) * this.EventosPorPagina;
    const fim = inicio + this.EventosPorPagina;
    return this.Eventos.slice(inicio, fim);
  }

  get EventosNaPaginaAtual2() {
    const inicio = (this.paginaAtual - 1) * this.EventosPorPagina;
    const fim = inicio + this.EventosPorPagina;
    return this.Eventos2.slice(inicio, fim);
  }

  criarNovaEvento() {
    if (this.equipes.length == 0) {
      alert("Para criar um evento é necessário o usuário ser moderador de ao menos uma equipe! Lembre-se a equipe deve possuir uma Sigla.")
    }
    else {
      if (this.Eventos.length <= 99) {
        this.abrirModal()
      }
      else
        alert("O usuário pode ter no máximo 100 Eventos!");
    }
  }

  mudarPagina(numero: number) {
    this.paginaAtual += numero;
    // Certifique-se de não ultrapassar o número total de páginas ou ir abaixo da página 1
    this.paginaAtual = Math.max(1, Math.min(this.paginaAtual, Math.ceil(this.Eventos.length / this.EventosPorPagina)));
  }

  get totalDePaginas() {
    return Math.ceil(this.Eventos.length / this.EventosPorPagina);
  }

  get totalDePaginas2() {
    return Math.ceil(this.Eventos2.length / this.EventosPorPagina);
  }

  fecharModal() {
    this.exibirModal = false;
    this.LimparEquipeSelecionada();
    this.LimpapesquisarlistaEquipes();
  }

  abrirModal() {
    this.exibirModal = true;
  }


  confirmarCancelar() {
    if (confirm('Gostaria de Cancelar a criação da Evento?')) {
      this.fecharModal();
      this.LimparEquipeSelecionada();
      this.LimpapesquisarlistaEquipes();
    }
  }

  async confirmarCriacao() {
    const nome = this.nomeEvento?.nativeElement.value;
    const equipe = this.nomepesquisalistaequipeselecionado;
    if ((nome.length > 0) && (equipe.length > 0)) {

      const ID = localStorage.getItem('ID');
      if (confirm(`Gostaria de Criar o novo Evento da equipe ${equipe} com o nome: ${nome}?`)) {
        const dadosEmpresa = {
          equipe: this.idpesquisalistaequipeselecionado,
          nome: this.nomeEvento?.nativeElement.value,
          local: '',
          peridiocidade: '',
          dia: '',
          hora: '',
          quantidade_time: 0
        };

        const isValid = await this.apiService.CriarEvento(dadosEmpresa);

        if (isValid !== 0) {
          if (isValid == 1)
            alert("Erro ao realizar a inclusão!");
          else if (isValid == -1) {
            alert("Falha de conexão com a API!")
          }
        }
        else
          alert("Inclusão da Evento realizada com sucesso!")

        this.fecharModal();
        this.nomeEvento!.nativeElement.value = ''; // Limpar o nome da Evento para futuras criações
        this.Eventos = [];
        this.carregarEventos();
        this.LimparEquipeSelecionada();
        this.LimpapesquisarlistaEquipes();
      }
    }
    else {
      alert("Para criar um novo evento, deve-se colocar um nome no mesmo assim como definir a equipe deste!");
    }
  }

  excluirEvento(index: number, nome: string) {

    if (confirm('Tem certeza que deseja excluir a Evento ' + nome + '?')) {
      this.apiService.deletarEvento(index.toString())
        .then(() => {
          alert('Evento ' + nome + ' deletado com sucesso!');
          this.Eventos = [];

          setTimeout(() => {
            this.carregarEventos();
          }, 0);

          this.validarEventos2(index);

        })
    }
  }

  Teladetalhes(idtela: string, tipo: string) {
    var idequipe = "0";
    for (const element of this.Eventos) {
      if(element.id.toString() == idtela)
        idequipe = element.idequipe;
    }
    localStorage.setItem('idtelaEquipe', idequipe);
    localStorage.setItem('idtela', idtela);
    localStorage.setItem('tipo', tipo);
    this.router.navigate(['/detalheevento']);
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

        this.Eventos = [];
        await this.carregarEventos(); // Assumindo que carregarEventos é uma função assíncrona
      };

      reader.readAsDataURL(file);
      event.target.value = '';
    }

  }

  TelaInicial() {
    this.router.navigate(['/inicio']);
  }

  botaopesquisarlistaEventos() {
    this.paginaAtual = 1;
    this.Eventos2 = [];
    const valorProcura = this.procura?.nativeElement.value.trim();
    if (valorProcura) {
      if (valorProcura.length > 0) {
        this.filtrou = true;
        const resultado = parseInt(valorProcura);
        if (!isNaN(resultado)) {
          if (!this.equipeevento)
            this.Eventos2 = this.Eventos.filter(Evento => Evento.id.toString() === valorProcura.toString());
          else
            this.Eventos2 = this.Eventos.filter(Evento => Evento.equipe.toString() === valorProcura.toString());
          if (this.Eventos2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
        else {
          if (!this.equipeevento)
            this.Eventos2 = this.Eventos.filter(Evento => Evento.nome.toLowerCase() === valorProcura.toLowerCase());
          else
            this.Eventos2 = this.Eventos.filter(Evento => Evento.nomeequipe.toLowerCase() === valorProcura.toLowerCase());
          if (this.Eventos2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
      }
    }
  }

  LimpapesquisarlistaEventos() {
    this.paginaAtual = 1;
    this.filtrou = false;
    this.procura!.nativeElement.value = "";
  }

  validarEventos2(index: number) {
    var indice = 0;
    indice = this.Eventos2.findIndex(a => a.id === index);
    if (indice >= 0) {
      this.Eventos2.splice(indice, 1);
    }
    if (this.Eventos2.length == 0) {
      this.existe = false;
    }
    else {
      this.existe = true;
    }
  }


  botaopesquisarlistaEquipes() {
    const campo = this.procura2?.nativeElement.value;

    if (campo.length > 0) {
      if (campo) {
        if (campo.length > 0) {
          this.filtrou2 = true;
          const resultado = parseInt(campo);
          if (!isNaN(resultado)) {
            this.equipes2 = this.equipes.filter(equipe => equipe.id.toString() === campo.toString());
            if (this.equipes2.length == 0) {
              this.existenalistaequipes2 = false;
            }
            else {
              this.existenalistaequipes2 = true;
            }
          }
          else {
            this.equipes2 = this.equipes.filter(equipe => equipe.nome.toLowerCase() === campo.toLowerCase());
            if (this.equipes2.length == 0) {
              this.existenalistaequipes2 = false;
            }
            else {
              this.existenalistaequipes2 = true;
            }
          }
        }
      }
    }
    else {
      this.LimpapesquisarlistaEquipes();
    }
  }

  LimpapesquisarlistaEquipes() {
    this.filtrou2 = false;
    this.procura2!.nativeElement.value = "";
  }

  escolhersemfiltro(i: number) {
    this.selecionada = true;
    this.idpesquisalistaequipeselecionado = this.equipes[i].id;
    this.imagempesquisalistaequipeselecionado = this.equipes[i].foto;
    this.nomepesquisalistaequipeselecionado = this.equipes[i].nome;
  }

  escolhercomfiltro(i: number) {
    this.selecionada = true;
    this.idpesquisalistaequipeselecionado = this.equipes2[i].id;
    this.imagempesquisalistaequipeselecionado = this.equipes2[i].foto;
    this.nomepesquisalistaequipeselecionado = this.equipes2[i].nome;
  }

  LimparEquipeSelecionada() {
    this.selecionada = false;
    this.idpesquisalistaequipeselecionado = "";
    this.imagempesquisalistaequipeselecionado = "";
    this.nomepesquisalistaequipeselecionado = "";
  }

  SetaEvento() {
    this.equipeevento = !this.equipeevento;
  }


}
