import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

interface NotaId {
  dataHoraEvento: string;
  idEvento: number;
  idUsuarioOrigem: number;
  idUsuarioDestino: number;
}

interface Nota {
  notaId: NotaId;
  notaparam1: number;
  notaparam2: number;
  notaparam3: number;
  notaparam4: number;
  notaparam5: number;
  notaparam6: number;
  notaparam7: number;
  notaparam8: number;
  notaparam9: number;
  notaparam10: number;
  notaparam11: number;
  notaparam12: number;
  notaparam13: number;
  notaparam14: number;
  notaparam15: number;
  notaparam16: number;
  notaparam17: number;
  notaparam18: number;
  notaparam19: number;
  notaparam20: number;
  avaliado: string;
}

@Component({
  selector: 'app-avaliacaoparticipantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avaliacaoparticipantes.component.html',
  styleUrl: './avaliacaoparticipantes.component.css'
})
export class AvaliacaoparticipantesComponent {
  @ViewChild('procura') procura: ElementRef | undefined;

  imagePath: string = '';
  IdUsuario: string = '';
  nomeUsuario: string = '';
  filtrou: boolean = false;
  existe: boolean = false;
  paginaAtual = 1;
  participantesPorPagina = 3;
  nomeparticipante: string = '';
  selecaoAtual: string = "0";
  exibirModal: boolean = false;
  participante: string = "";
  idparticipante: number = 0;  
  
  participantes: {
    id: number,
    nome: string,
    foto: string,
    idevento: number,
    email: string,
    statusparticipantes: string
    nota1: number,
    nota2: number,
    nota3: number,
    nota4: number,
    nota5: number,
    nota6: number,
    nota7: number,
    nota8: number,
    nota9: number,
    nota10: number,
    nota11: number,
    nota12: number,
    nota13: number,
    nota14: number,
    nota15: number,
    nota16: number,
    nota17: number,
    nota18: number,
    nota19: number,
    nota20: number,
    nomeparam1: string,
    nomeparam2: string,
    nomeparam3: string,
    nomeparam4: string,
    nomeparam5: string,
    nomeparam6: string,
    nomeparam7: string,
    nomeparam8: string,
    nomeparam9: string,
    nomeparam10: string,
    nomeparam11: string,
    nomeparam12: string,
    nomeparam13: string,
    nomeparam14: string,
    nomeparam15: string,
    nomeparam16: string,
    nomeparam17: string,
    nomeparam18: string,
    nomeparam19: string,
    nomeparam20: string,
  }[] = [];

  participantes2: {
    id: number,
    nome: string,
    foto: string,
    idevento: number,
    email: string,
    statusparticipantes: string
    nota1: number,
    nota2: number,
    nota3: number,
    nota4: number,
    nota5: number,
    nota6: number,
    nota7: number,
    nota8: number,
    nota9: number,
    nota10: number,
    nota11: number,
    nota12: number,
    nota13: number,
    nota14: number,
    nota15: number,
    nota16: number,
    nota17: number,
    nota18: number,
    nota19: number,
    nota20: number
  }[] = [];

  parametros: {
    nome: string,
    peso: string,
    valor: number,
    tipo: string,
    numero: number
  }[] = [];

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
    this.carregarparticipante();
  }

  carregarDadosUsuario() {
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';

  }

  async carregarparticipante() {
    const idusuario = localStorage.getItem('ID');
    const idevento = localStorage.getItem('avaliacaoparticipantes_id');
    const dataevento = localStorage.getItem('avaliacaoparticipantes_dataavaliacao');
    const idtelaEquipe = localStorage.getItem('idtelaEquipe');
    const equipe = await this.apiService.obterUmaEquipes(idtelaEquipe?.toString() ? idtelaEquipe?.toString() : "");

    const dados = {
      dataHoraEvento: dataevento,
      idEvento: idevento,
      idUsuario: idusuario
    }

    const notas = await this.apiService.obterNotasDataEventoUsuario(dados);

    for (const nota of notas) {
      const usuario = this.apiService.obterUsuarioPorId(nota.notaId.idUsuarioDestino.toString())
      if((this.selecaoAtual == "0" && nota.avaliado == null) || (this.selecaoAtual == "1" && nota.avaliado != null) || (this.selecaoAtual == "2"))
      {
        this.participantes.push({
          id: nota.notaId.idUsuarioDestino,
          nome: (await usuario).nome,
          foto: (await usuario).foto,
          email: (await usuario).email,
          idevento: nota.notaId.idEvento,
          statusparticipantes: nota.avaliado == null ? "NA" : nota.avaliado == "A" ? "A" : "ANC",
          nota1: nota.notaparam1,
          nota2: nota.notaparam2,
          nota3: nota.notaparam3,
          nota4: nota.notaparam4,
          nota5: nota.notaparam5,
          nota6: nota.notaparam6,
          nota7: nota.notaparam7,
          nota8: nota.notaparam8,
          nota9: nota.notaparam9,
          nota10: nota.notaparam10,
          nota11: nota.notaparam11,
          nota12: nota.notaparam12,
          nota13: nota.notaparam13,
          nota14: nota.notaparam14,
          nota15: nota.notaparam15,
          nota16: nota.notaparam16,
          nota17: nota.notaparam17,
          nota18: nota.notaparam18,
          nota19: nota.notaparam19,
          nota20: nota.notaparam20,
          nomeparam1: equipe.nomeparametro1,
          nomeparam2: equipe.nomeparametro2,
          nomeparam3: equipe.nomeparametro3,
          nomeparam4: equipe.nomeparametro4,
          nomeparam5: equipe.nomeparametro5,
          nomeparam6: equipe.nomeparametro6,
          nomeparam7: equipe.nomeparametro7,
          nomeparam8: equipe.nomeparametro8,
          nomeparam9: equipe.nomeparametro9,
          nomeparam10: equipe.nomeparametro10,
          nomeparam11: equipe.nomeparametro11,
          nomeparam12: equipe.nomeparametro12,
          nomeparam13: equipe.nomeparametro13,
          nomeparam14: equipe.nomeparametro14,
          nomeparam15: equipe.nomeparametro15,
          nomeparam16: equipe.nomeparametro16,
          nomeparam17: equipe.nomeparametro17,
          nomeparam18: equipe.nomeparametro18,
          nomeparam19: equipe.nomeparametro19,
          nomeparam20: equipe.nomeparametro20,
        });
      }

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

  TelaInicial() {
    this.router.navigate(['/inicio']);
  }

  salvarSelecao() {
    const combo = document.getElementById("participanteparticipante") as HTMLSelectElement;
    if (combo) {
      this.selecaoAtual = combo.value;
    }
    this.participantes = [];
    this.carregarparticipante();
  }

  botaopesquisarlistaparticipantes() {
    this.paginaAtual = 1;
    this.participantes2 = [];
    const valorProcura = this.procura?.nativeElement.value.trim();
    if (valorProcura) {
      if (valorProcura.length > 0) {
        this.filtrou = true;

        this.participantes2 = this.participantes.filter(participante =>
          participante.id === valorProcura
        );
        if (this.participantes2.length == 0) {
          this.existe = false;
        }
        else {
          this.existe = true;
        }
        if (!this.existe) {
          this.participantes2 = this.participantes.filter(participante => participante.nome.toLowerCase() === valorProcura.toLowerCase());
          if (this.participantes2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
      }
    }
  }

  Limpapesquisarlistaparticipantes() {
    this.paginaAtual = 1;
    this.filtrou = false;
    this.procura!.nativeElement.value = "";
  }

  get participantesNaPaginaAtual() {
    const inicio = (this.paginaAtual - 1) * this.participantesPorPagina;
    const fim = inicio + this.participantesPorPagina;
    return this.participantes.slice(inicio, fim);
  }

  get participantesNaPaginaAtual2() {
    const inicio = (this.paginaAtual - 1) * this.participantesPorPagina;
    const fim = inicio + this.participantesPorPagina;
    return this.participantes2.slice(inicio, fim);
  }

  get totalDePaginas() {
    return Math.ceil(this.participantes.length / this.participantesPorPagina);
  }

  get totalDePaginas2() {
    return Math.ceil(this.participantes2.length / this.participantesPorPagina);
  }

  mudarPagina(numero: number) {
    this.paginaAtual += numero;
    // Certifique-se de não ultrapassar o número total de páginas ou ir abaixo da página 1
    this.paginaAtual = Math.max(1, Math.min(this.paginaAtual, Math.ceil(this.participantes.length / this.participantesPorPagina)));
  }

  async abrirmodal(id: number) {
    this.exibirModal = true;    
    await this.carregarparametros1(id);
    await this.carregarparametros();
   
  }

  fecharModal() {
    this.parametros = [];
    this.exibirModal = false;
  }

  carregarparametros()
  {
    var sequencianota1 = 1;
    for(let parametro of this.parametros)
    {
      setTimeout(() => {                       
        const notacaoDropdown = document.getElementById(`notacao-dropdown-${sequencianota1}`) as HTMLSelectElement;        
        notacaoDropdown.value = parametro.valor.toString();    
        sequencianota1++;
      }, 0);
    }    
  }

  carregarparametros1(id: number) {
    const participante = this.participantes.filter(participante => participante.id === id);
    this.participante = participante[0].nome;
    this.idparticipante = participante[0].id;

    var parts = participante[0].nomeparam1.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {      
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota1 : Math.floor(participante[0].nota1 / 2),
          tipo: parts[2],
          numero: 1
        });             
      }

    parts = participante[0].nomeparam2.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota2 : Math.floor(participante[0].nota2 / 2),
          tipo: parts[2],
          numero: 2
        });
      }

    parts = participante[0].nomeparam3.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota3 : Math.floor(participante[0].nota3 / 2),
          tipo: parts[2],
          numero: 3
        });
      }

    parts = participante[0].nomeparam4.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota4 : Math.floor(participante[0].nota4 / 2),
          tipo: parts[2],
          numero: 4
        });
      }
    parts = participante[0].nomeparam5.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota5 : Math.floor(participante[0].nota5 / 2),
          tipo: parts[2],
          numero: 5
        });
      }

    parts = participante[0].nomeparam6.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota6 : Math.floor(participante[0].nota6 / 2),
          tipo: parts[2],
          numero: 6
        });
      }

      parts = participante[0].nomeparam7.split(";").slice(0, -1);
      if (parts.length > 0)
        if (parts[3] == "true") {         
          this.parametros.push({
            nome: parts[0],
            peso: parts[1],
            valor: parts[2] == "1-10"? participante[0].nota7 : Math.floor(participante[0].nota7 / 2),
            tipo: parts[2],
            numero: 7
          });
        }       
  
    parts = participante[0].nomeparam8.split(";").slice(0, -1);
    if (parts.length > 0){}      
      if (parts[3] == "true") { 
         
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota8 : Math.floor(participante[0].nota8 / 2),
          tipo: parts[2],
          numero: 8
        });
        
      }

    parts = participante[0].nomeparam9.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {       
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota9 : Math.floor(participante[0].nota9 / 2),
          tipo: parts[2],
          numero: 9
        });
      }

    parts = participante[0].nomeparam10.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota10 : Math.floor(participante[0].nota10 / 2),
          tipo: parts[2],
          numero: 10
        });
      }

    parts = participante[0].nomeparam11.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {       
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota11 : Math.floor(participante[0].nota11 / 2),
          tipo: parts[2],
          numero: 11
        });
      }

    parts = participante[0].nomeparam12.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota12 : Math.floor(participante[0].nota12 / 2),
          tipo: parts[2],
          numero: 12
        });
        
      }

    parts = participante[0].nomeparam13.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota13 : Math.floor(participante[0].nota13 / 2),
          tipo: parts[2],
          numero: 13
        });
       
      }

    parts = participante[0].nomeparam14.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota14 : Math.floor(participante[0].nota14 / 2),
          tipo: parts[2],
          numero: 14
        });
       
      }

    parts = participante[0].nomeparam15.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota15 : Math.floor(participante[0].nota15 / 2),
          tipo: parts[2],
          numero: 15
        });
        
      }

    parts = participante[0].nomeparam16.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota16 : Math.floor(participante[0].nota16 / 2),
          tipo: parts[2],
          numero: 16
        });
        
      }

    parts = participante[0].nomeparam17.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota17 : Math.floor(participante[0].nota17 / 2),
          tipo: parts[2],
          numero: 17
        });
        
      }

    parts = participante[0].nomeparam18.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota18 : Math.floor(participante[0].nota18 / 2),
          tipo: parts[2],
          numero: 18
        });
        
      }

    parts = participante[0].nomeparam19.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota19 : Math.floor(participante[0].nota19 / 2),
          tipo: parts[2],
          numero: 19
        });
       
      }

    parts = participante[0].nomeparam20.split(";").slice(0, -1);
    if (parts.length > 0)
      if (parts[3] == "true") {        
        this.parametros.push({
          nome: parts[0],
          peso: parts[1],
          valor: parts[2] == "1-10"? participante[0].nota20 : Math.floor(participante[0].nota20 / 2),
          tipo: parts[2],
          numero: 20
        });
        
      }
  }

  Alterarparametro( i: number)
  {

    const notacaoDropdown = document.getElementById(`notacao-dropdown-${i+1}`) as HTMLSelectElement;          
    this.parametros[i].valor = parseInt(notacaoDropdown.value);
  }

  async AlterarDados(){
    const confirmation = confirm('Deseja de fato realizar a alteração de notas do Participante ' + this.participante + "?");
    if (confirmation) {
    const idusuario = localStorage.getItem('ID');
    const idevento = localStorage.getItem('avaliacaoparticipantes_id');
    const dataevento = localStorage.getItem('avaliacaoparticipantes_dataavaliacao');

    if(dataevento && idevento && idusuario){
      var notaid: NotaId = {
        dataHoraEvento: dataevento,
        idEvento: parseInt(idevento),
        idUsuarioDestino: this.idparticipante,
        idUsuarioOrigem: parseInt(idusuario)
      }     
      
      var ListagemNotas:{
        valorvariavel : number        
      }[] = [];
      
      for(let i = 1; i<21; i++)
      {
        var nota_aux=0;
        try
        {
          nota_aux = this.parametros.filter(param => param.numero === i)[0].valor;
          const tipo = this.parametros.filter(param => param.numero === i)[0].tipo;
          if(tipo != "1-10")
            nota_aux = nota_aux*2;
        }
        catch{
          nota_aux = 6;
        }          

        ListagemNotas.push({
          valorvariavel : nota_aux
        });
      }
      
      var nota: Nota ={
        notaId: notaid,
        avaliado:"A",
        notaparam1: ListagemNotas[0].valorvariavel,
        notaparam2: ListagemNotas[1].valorvariavel,
        notaparam3: ListagemNotas[2].valorvariavel,
        notaparam4: ListagemNotas[3].valorvariavel,
        notaparam5: ListagemNotas[4].valorvariavel,
        notaparam6: ListagemNotas[5].valorvariavel,
        notaparam7: ListagemNotas[6].valorvariavel,
        notaparam8: ListagemNotas[7].valorvariavel,
        notaparam9: ListagemNotas[8].valorvariavel,
        notaparam10: ListagemNotas[9].valorvariavel,
        notaparam11: ListagemNotas[10].valorvariavel,
        notaparam12: ListagemNotas[11].valorvariavel,
        notaparam13: ListagemNotas[12].valorvariavel,
        notaparam14: ListagemNotas[13].valorvariavel,
        notaparam15: ListagemNotas[14].valorvariavel,
        notaparam16: ListagemNotas[15].valorvariavel,
        notaparam17: ListagemNotas[16].valorvariavel,
        notaparam18: ListagemNotas[17].valorvariavel,
        notaparam19: ListagemNotas[18].valorvariavel,
        notaparam20: ListagemNotas[19].valorvariavel,
      }  

      const Notavalida = await this.apiService.AlterarNota(nota);
      alert("alteração de nota realizada com sucesso!");
      this.parametros = [];
      this.participantes = [];
      this.exibirModal = false;
      this.carregarparticipante();
    }
      
  }
}

Telaavaliacaopendente()
{
  this.router.navigate(['/avaliacoespendentes']);
}

}
