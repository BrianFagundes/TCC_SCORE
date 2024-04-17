import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent {

  @ViewChild('procura') procura: ElementRef | undefined;
  @ViewChild('procura2') procura2: ElementRef | undefined;

  
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
    moderador: number,
    statuseventos : string
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
  imagePath: string = '';
  nomeUsuario: string = ''; // Variável para armazenar o nome do usuário
  IdUsuario: string = ''; // Variável para armazenar o email do usuário
  imagempesquisalistaeventos: string = '';
  ideventos: string = '';
  nomeeventos: string = '';
  filtrou: boolean = false;
  filtrou2: boolean = false;
  existe: boolean = false;
  exibireventos: boolean = false;
  existenalistaeventos: boolean = false;
  habilitaevento : boolean = true;

  participantesSelecionadoseventos: Array<{ id: string, imagem: string; nome: string; idequipe:number }> = [];


  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
  }

  ngOnInit() {
    localStorage.setItem('Teladecadastro', "false");
    this.carregarDadosUsuario();
    this.carregarEquipes();
  }

  carregarDadosUsuario() {
    const ID = localStorage.getItem('ID');
    this.IdUsuario = ID ? ID.toString() : '';

    if (ID) {
      this.apiService.obterUsuarioPorId(ID.toString())
        .then(usuario => {
          // Atualiza localStorage com os novos dados
          localStorage.setItem('Usuario', usuario.nome);
          localStorage.setItem('imagem', usuario.foto);

          // Atualiza as propriedades do componente com os novos dados
          this.nomeUsuario = usuario.nome;
          this.imagePath = usuario.foto;

          // Verifica se a imagem foi carregada corretamente
          if (this.imagePath === "") {
            this.router.navigate(['/inicio']);
          }
        })
        .catch(error => {
          console.error('Erro ao obter o usuário:', error);
          // Em caso de erro na requisição, redireciona ou trata o erro conforme necessário
          this.router.navigate(['/inicio']);
        });
    } else {
      // Se não houver ID, redireciona para a página de início ou trata conforme necessário
      this.router.navigate(['/inicio']);
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

  CriarEquipe() {
    this.router.navigate(['/criarequipes']);
  }

  CriarEvento() {
    this.router.navigate(['/criarevento']);
  }

  Equipesfacoparte() {
    this.router.navigate(['/equipes']);
  }


  async carregarEquipes() {
    try {
      const ID = localStorage.getItem('ID');

      const equipes = await this.apiService.obterTodasEquipes2(ID?.toString() ? ID?.toString() : ""); // Ajuste o nome do método conforme sua implementação

      equipes.forEach(element => {
        if (element.sigla !== "") {
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
            moderador: element.moderador,
            statuseventos : element.statuseventos,
          });
        }
      });

      this.habilitaevento = true;
      if(this.equipes.length > 0)
      {
        for(let equipe of this.equipes)  
        {
          if(!this.habilitaevento)
          {
            break;  
          }
          else
          {
            const participantes = await this.apiService.obterTodosParticipantesEquipe(equipe.id.toString());
            if(participantes.find(participante => participante.moderador == true && participante.usuario == ID))
              this.habilitaevento = false;
          }            
        }
      }     

    } catch (error) {
      console.error('Erro ao carregar equipes:', error);
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

  exibirevento(id: number, imagem: string) {
    this.exibireventos = true;
    setTimeout(() => {
      this.CarregarEventos(id, imagem);
    }, 0);
  }

  fechareventos() {

    this.participantesSelecionadoseventos = [];
    this.exibireventos = false;
  }

  async CarregarEventos(id: number, imagem: string) {
    const Eventos = await this.apiService.obterTodosEventos(id.toString()); // Ajuste o nome do método conforme sua implementação

    for (const evento of Eventos) {
      if(evento.local !== "")
      {
        var dataHoraEvento =new Date();
        const agora = new Date();
        const dataHoraEventoStr = `${evento.dia}T${evento.hora}`; 
        dataHoraEvento = new Date(dataHoraEventoStr); 
        if (evento.status != 'F' || evento.peridiocidade == "Semanal") {
          this.participantesSelecionadoseventos.push({
            id: evento.id.toString(),
            imagem: imagem,
            nome: evento.nome,
            idequipe: id
          });
        }
      } 
    }
  }

  botaopesquisarlistaeventos() {
    const campo = this.procura2?.nativeElement.value;
    if (campo.length > 0) {
      this.filtrou2 = true;
      const resultado = parseInt(campo);
      var indice = 0;
      if (!isNaN(resultado)) {
        indice = this.participantesSelecionadoseventos.findIndex(a => a.id === resultado.toString());

      } else {
        indice = this.participantesSelecionadoseventos.findIndex(a => a.nome === campo);
      }
      if (indice !== -1) {
        this.existenalistaeventos = true;
        const evento = this.participantesSelecionadoseventos[indice];
        this.imagempesquisalistaeventos = evento.imagem;
        this.ideventos = evento.id;
        this.nomeeventos = evento.nome;
      } else {
        this.existenalistaeventos = false;
      }

    } else {
      this.Limpapesquisarlistaeventos();
    }
  }

  Limpapesquisarlistaeventos() {
    this.filtrou2 = false;
    this.procura2!.nativeElement.value = "";
  }


  Teladetalhes(idtela: string) {
    var idequipe = "0";
    for (const element of this.participantesSelecionadoseventos) {
      if(element.id.toString() == idtela)
        idequipe = element.idequipe.toString();
    }
    localStorage.setItem('idtelaEquipe', idequipe);
    localStorage.setItem('idtela', idtela);
    localStorage.setItem('tipo', 'D');
    localStorage.setItem('origem', 'eventos');
    this.router.navigate(['/detalheevento']);
  }

  telausuarioequipe(id: number){
    
    const indice = this.equipes.findIndex(equipe => equipe.id === id);
    
    if(!this.equipes[indice].statuseventos)
      alert("Todos os Eventos vinculados a Equipe nunca foram finalizados, portanto, não existem notas atribuidas!");
    else
    {
      localStorage.setItem('idtelaEquipe', id.toString());
      this.router.navigate(['/usuarioequipe']);
    }    
  }

}
