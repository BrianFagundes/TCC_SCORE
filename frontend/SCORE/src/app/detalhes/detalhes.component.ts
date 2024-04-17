import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

interface Modelo {
  esporte: string;
  parametro: string;
  peso: number;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  @ViewChild('nomeEquipe') nomeEquipe: ElementRef | undefined;
  @ViewChild('sigla') sigla: ElementRef | undefined;
  @ViewChild('procura') procura: ElementRef | undefined;
  @ViewChild('procura2') procura2: ElementRef | undefined;


  imagePath: string = '';
  imagePath2: string = '';
  imagem: string = '';
  imagempesquisalistaparticipante: string = '';
  nomeUsuario: string = '';
  IdUsuario: string = '';
  qtdcaracteres: string = '';
  modeloequipes: { esporte: string, parametro: string, peso: number }[][] = [];
  NomeModelo: string[] = [];
  exibirModal = false;
  parametroHabilitado: boolean[] = new Array(20).fill(true);
  parametros: any[] = [{ habilitado: true, parametro: '', importancia: 1, avaliacao: '1-10' }];
  criacao: boolean = true;
  quantidadeLinhas: number = 1;
  dadosParametrosSalvos: Array<{ parametro: string; importancia: number; avaliacao: string }> = [];
  modelo: string = '';
  habilitoAplicar: boolean = false;
  exibirparticipantes: boolean = false;
  existe: boolean = false;
  filtrou: boolean = false;
  nome: string = "";
  nomepesquisalistaparticipante: string = "";
  email: string = "";
  emailpesquisalistaparticipante: string = "";
  id: string = "0";
  participantesSelecionados: Array<{ id: string, imagem: string; nome: string; email: string; moderador: boolean }> = [];
  participantesSelecionados2: Array<{ id: string, imagem: string; nome: string; email: string; moderador: boolean }> = [];
  moderadorpesquisalistaparticipante: boolean = false;
  idpesquisalistaparticipante: number = 0;
  existenalistaparticipantes: boolean = false;
  tipotela : string = "";







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
    this.carregarEquipe();
    this.obterModelo();
  }

  carregarDadosUsuario() {
    const tipotela = localStorage.getItem('tipo');
    this.tipotela = tipotela? tipotela.toString():'';
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';

  }

  async carregarEquipe() {
    try {
      const ID = localStorage.getItem('idtela');
      const equipe = await this.apiService.obterUmaEquipes(ID?.toString() ? ID?.toString() : "");
      this.nomeEquipe!.nativeElement.value = equipe.nome;
      this.imagePath2 = equipe.foto ? equipe.foto : '../../assets/upload.png';
      this.sigla!.nativeElement.value = equipe.sigla;
      this.criacao = equipe.statuseventos == "F" ? false : true;
      var textarea = document.getElementById('meuTextarea') as HTMLTextAreaElement;
      textarea.value = equipe.informacoes;
      this.atualizarContagemCaracteres();

      var parts = equipe.nomeparametro1.split(";").slice(0, -1);
      if (equipe.nomeparametro1.includes(";")) {        
        this.parametroHabilitado[0] = parts[3] == "true";
        this.modelo = parts[4];
        if (this.modelo.length == 0)
          this.habilitoAplicar = true;
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      if (parts.length == 0)
        this.habilitoAplicar = true;

      parts = equipe.nomeparametro2.split(";").slice(0, -1);

      if (equipe.nomeparametro2.includes(";")) {
        this.parametroHabilitado[1] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro3.split(";").slice(0, -1);
      if (equipe.nomeparametro3.includes(";")) {
        this.parametroHabilitado[2] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro4.split(";").slice(0, -1);
      if (equipe.nomeparametro4.includes(";")) {
        this.parametroHabilitado[3] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro5.split(";").slice(0, -1);
      if (equipe.nomeparametro5.includes(";")) {
        this.parametroHabilitado[4] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro6.split(";").slice(0, -1);
      if (equipe.nomeparametro6.includes(";")) {
        this.parametroHabilitado[5] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro7.split(";").slice(0, -1);
      if (equipe.nomeparametro7.includes(";")) {
        this.parametroHabilitado[6] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro8.split(";").slice(0, -1);
      if (equipe.nomeparametro8.includes(";")) {
        this.parametroHabilitado[7] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro9.split(";").slice(0, -1);
      if (equipe.nomeparametro9.includes(";")) {
        this.parametroHabilitado[8] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro10.split(";").slice(0, -1);
      if (equipe.nomeparametro10.includes(";")) {
        this.parametroHabilitado[9] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro11.split(";").slice(0, -1);
      if (equipe.nomeparametro11.includes(";")) {
        this.parametroHabilitado[10] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro12.split(";").slice(0, -1);
      if (equipe.nomeparametro12.includes(";")) {
        this.parametroHabilitado[11] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro13.split(";").slice(0, -1);
      if (equipe.nomeparametro13.includes(";")) {
        this.parametroHabilitado[12] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro14.split(";").slice(0, -1);
      if (equipe.nomeparametro14.includes(";")) {
        this.parametroHabilitado[13] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro15.split(";").slice(0, -1);
      if (equipe.nomeparametro15.includes(";")) {
        this.parametroHabilitado[14] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro16.split(";").slice(0, -1);
      if (equipe.nomeparametro16.includes(";")) {
        this.parametroHabilitado[15] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro17.split(";").slice(0, -1);
      if (equipe.nomeparametro17.includes(";")) {
        this.parametroHabilitado[16] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro18.split(";").slice(0, -1);
      if (equipe.nomeparametro18.includes(";")) {
        this.parametroHabilitado[17] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro19.split(";").slice(0, -1);
      if (equipe.nomeparametro19.includes(";")) {
        this.parametroHabilitado[18] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      parts = equipe.nomeparametro20.split(";").slice(0, -1);
      if (equipe.nomeparametro20.includes(";")) {
        this.parametroHabilitado[19] = parts[3] == "true";
        this.adicionarParametro();
        this.dadosParametrosSalvos.push({
          parametro: parts[0],
          importancia: parseInt(parts[1]),
          avaliacao: parts[2]
        });
      }

      const participantes = await this.apiService.obterTodosParticipantesEquipe(ID?.toString() ? ID?.toString() : "0");


      participantes.forEach(element => {
        this.apiService.LevantarParticipantes(element.usuario, "k")
          .then(usuario => {
            this.participantesSelecionados.push({
              id: usuario.id.toString(),
              imagem: usuario.foto,
              nome: usuario.nome,
              email: usuario.email,
              moderador: element.moderador
            });
          })
          .catch(error => {

            alert('Erro ao obter o usuário:' + error);
          });
      });

      setTimeout(() => {
        const dropdownModelos = document.getElementById('dropdownModelos') as HTMLSelectElement;
        if (dropdownModelos) {
          dropdownModelos.value = this.modelo;
        }
      }, 0);

    } catch (error) {
      alert('Erro ao carregar equipe: ' + error);

    }
  }



  habilitaaplicarmetodo() {
    const dropdownModelos = document.getElementById('dropdownModelos') as HTMLSelectElement;

    if (dropdownModelos.value !== "1") {
      this.habilitoAplicar = false;
    }
    else {
      this.habilitoAplicar = true;
    }
  }

  async obterModelo() {
    const modelosRaw = await this.apiService.Levantarmodelos();


    const modelos: Modelo[][] = modelosRaw.map(item => [item]);

    this.NomeModelo = modelos
      .map((equipe: Modelo[]) => equipe[0].esporte)
      .filter((modalidade, index, self) => self.indexOf(modalidade) === index);

    modelos.forEach((dado: Modelo[]) => {
      dado.forEach((element: Modelo) => {

        const modalidadeIndex = this.modeloequipes.findIndex(equipe => equipe[0]?.esporte === element.esporte);
        if (modalidadeIndex !== -1) {

          this.modeloequipes[modalidadeIndex].push(element);
        } else {

          this.modeloequipes.push([element]);
        }
      });
    });

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
      this.router.navigate(['/home']);
    }
  }

  toggleParametro(index: number) {
    this.parametroHabilitado[index] = !this.parametroHabilitado[index];
  }


  atualizarContagemCaracteres() {
    var textarea = document.getElementById('meuTextarea') as HTMLTextAreaElement;
    var contagemRestante = 255 - textarea.value.length;
    this.qtdcaracteres = contagemRestante + " caracteres restantes";

  }

  async confirmarAlteracao() {

    if (confirm(`Gostaria de Alterar a equipe ${this.nomeEquipe?.nativeElement.value}?`)) {
      try {
        this.criticar();
        this.AjustarEquipe()
      }
      catch (ex) {
        const erro = ex as Error;
        alert("Erro ao tentar ajustar equipe: " + erro.toString().substring(7));
      }


    }
  }

  criticar() {
    if (this.nomeEquipe?.nativeElement.value.length <= 0) {
      throw new Error("O nome da equipe não pode ser vazio.");
    }

    if (this.imagePath2.length <= 0) {
      throw new Error("Deve-se definir uma imagem ao grupo!");
    }

    if (this.sigla?.nativeElement.value <= 0) {
      throw new Error("A sigla da equipe não pode estar vazio.");
    }

    if ((this.quantidadeLinhas <= 1) && (!this.dadosParametrosSalvos[0])) {
      throw new Error("Deve existir ao menos um parâmetro para a equipe!");
    }

    for (let i = 0; i < this.quantidadeLinhas; i++) {
      if (this.dadosParametrosSalvos[i].parametro.length <= 0) {
        throw new Error("Todos os parâmetros indicados devem estar com um nome, o parâmetro " + i + " da lista de parâmetros não está, favor deletar ou ajustar!");
      }
    }


  }

  async AjustarEquipe() {
    const ID = localStorage.getItem('ID');
    const IDtela = localStorage.getItem('idtela');
    var textarea = document.getElementById('meuTextarea') as HTMLTextAreaElement;

    const dadosEmpresa = {
      id: IDtela,
      nome: this.nomeEquipe?.nativeElement.value,
      foto: this.imagePath2,
      sigla: this.sigla?.nativeElement.value,
      informacoes: textarea.value,
      nomeparametro1: this.quantidadeLinhas > 0 ? this.dadosParametrosSalvos[0].parametro + ";" + this.dadosParametrosSalvos[0].importancia + ";" + this.dadosParametrosSalvos[0].avaliacao + ";" + this.parametroHabilitado[0] + ";" + this.modelo + ";" : '',
      nomeparametro2: this.quantidadeLinhas > 1 ? this.dadosParametrosSalvos[1].parametro + ";" + this.dadosParametrosSalvos[1].importancia + ";" + this.dadosParametrosSalvos[1].avaliacao + ";" + this.parametroHabilitado[1] + ";" : '',
      nomeparametro3: this.quantidadeLinhas > 2 ? this.dadosParametrosSalvos[2].parametro + ";" + this.dadosParametrosSalvos[2].importancia + ";" + this.dadosParametrosSalvos[2].avaliacao + ";" + this.parametroHabilitado[2] + ";" : '',
      nomeparametro4: this.quantidadeLinhas > 3 ? this.dadosParametrosSalvos[3].parametro + ";" + this.dadosParametrosSalvos[3].importancia + ";" + this.dadosParametrosSalvos[3].avaliacao + ";" + this.parametroHabilitado[3] + ";" : '',
      nomeparametro5: this.quantidadeLinhas > 4 ? this.dadosParametrosSalvos[4].parametro + ";" + this.dadosParametrosSalvos[4].importancia + ";" + this.dadosParametrosSalvos[4].avaliacao + ";" + this.parametroHabilitado[4] + ";" : '',
      nomeparametro6: this.quantidadeLinhas > 5 ? this.dadosParametrosSalvos[5].parametro + ";" + this.dadosParametrosSalvos[5].importancia + ";" + this.dadosParametrosSalvos[5].avaliacao + ";" + this.parametroHabilitado[5] + ";" : '',
      nomeparametro7: this.quantidadeLinhas > 6 ? this.dadosParametrosSalvos[6].parametro + ";" + this.dadosParametrosSalvos[6].importancia + ";" + this.dadosParametrosSalvos[6].avaliacao + ";" + this.parametroHabilitado[6] + ";" : '',
      nomeparametro8: this.quantidadeLinhas > 7 ? this.dadosParametrosSalvos[7].parametro + ";" + this.dadosParametrosSalvos[7].importancia + ";" + this.dadosParametrosSalvos[7].avaliacao + ";" + this.parametroHabilitado[7] + ";" : '',
      nomeparametro9: this.quantidadeLinhas > 8 ? this.dadosParametrosSalvos[8].parametro + ";" + this.dadosParametrosSalvos[8].importancia + ";" + this.dadosParametrosSalvos[8].avaliacao + ";" + this.parametroHabilitado[8] + ";" : '',
      nomeparametro10: this.quantidadeLinhas > 9 ? this.dadosParametrosSalvos[9].parametro + ";" + this.dadosParametrosSalvos[9].importancia + ";" + this.dadosParametrosSalvos[9].avaliacao + ";" + this.parametroHabilitado[9] + ";" : '',
      nomeparametro11: this.quantidadeLinhas > 10 ? this.dadosParametrosSalvos[10].parametro + ";" + this.dadosParametrosSalvos[10].importancia + ";" + this.dadosParametrosSalvos[10].avaliacao + ";" + this.parametroHabilitado[10] + ";" : '',
      nomeparametro12: this.quantidadeLinhas > 11 ? this.dadosParametrosSalvos[11].parametro + ";" + this.dadosParametrosSalvos[11].importancia + ";" + this.dadosParametrosSalvos[11].avaliacao + ";" + this.parametroHabilitado[11] + ";" : '',
      nomeparametro13: this.quantidadeLinhas > 12 ? this.dadosParametrosSalvos[12].parametro + ";" + this.dadosParametrosSalvos[12].importancia + ";" + this.dadosParametrosSalvos[12].avaliacao + ";" + this.parametroHabilitado[12] + ";" : '',
      nomeparametro14: this.quantidadeLinhas > 13 ? this.dadosParametrosSalvos[13].parametro + ";" + this.dadosParametrosSalvos[13].importancia + ";" + this.dadosParametrosSalvos[13].avaliacao + ";" + this.parametroHabilitado[13] + ";" : '',
      nomeparametro15: this.quantidadeLinhas > 14 ? this.dadosParametrosSalvos[14].parametro + ";" + this.dadosParametrosSalvos[14].importancia + ";" + this.dadosParametrosSalvos[14].avaliacao + ";" + this.parametroHabilitado[14] + ";" : '',
      nomeparametro16: this.quantidadeLinhas > 15 ? this.dadosParametrosSalvos[15].parametro + ";" + this.dadosParametrosSalvos[15].importancia + ";" + this.dadosParametrosSalvos[15].avaliacao + ";" + this.parametroHabilitado[15] + ";" : '',
      nomeparametro17: this.quantidadeLinhas > 16 ? this.dadosParametrosSalvos[16].parametro + ";" + this.dadosParametrosSalvos[16].importancia + ";" + this.dadosParametrosSalvos[16].avaliacao + ";" + this.parametroHabilitado[16] + ";" : '',
      nomeparametro18: this.quantidadeLinhas > 17 ? this.dadosParametrosSalvos[17].parametro + ";" + this.dadosParametrosSalvos[17].importancia + ";" + this.dadosParametrosSalvos[17].avaliacao + ";" + this.parametroHabilitado[17] + ";" : '',
      nomeparametro19: this.quantidadeLinhas > 18 ? this.dadosParametrosSalvos[18].parametro + ";" + this.dadosParametrosSalvos[18].importancia + ";" + this.dadosParametrosSalvos[18].avaliacao + ";" + this.parametroHabilitado[18] + ";" : '',
      nomeparametro20: this.quantidadeLinhas > 19 ? this.dadosParametrosSalvos[19].parametro + ";" + this.dadosParametrosSalvos[19].importancia + ";" + this.dadosParametrosSalvos[19].avaliacao + ";" + this.parametroHabilitado[19] + ";" : '',
      moderador: ID
    };


    const isValid = await this.apiService.AlterarEquipe(dadosEmpresa);
    if (isValid !== 0) {
      if (isValid == 1)
        alert("Erro ao realizar a Alteração!");
      else if (isValid == -1) {
        alert("Falha de conexão com a API!");
      }
    }
    else {
      setTimeout(() => {
        this.ajusteparticipante();
      }, 0);
      alert("Alteração da equipe realizada com sucesso!");
      this.TelaCriacaoequipe();
    }
  }

  async ajusteparticipante() {


    var dadosParticipante = {
      equipe: "1",
      usuario: "1",
      moderador: false,
      pagou: false,
    };

    const IDTELA = localStorage.getItem('idtela');
    var i = 0;
    if (IDTELA) {
      for (const participante of this.participantesSelecionados) {
        dadosParticipante.equipe = IDTELA;
        dadosParticipante.usuario = participante.id;
        dadosParticipante.moderador = participante.moderador;
        const isValid = await this.apiService.CriarParticipante(dadosParticipante, i);
        i++;

        if (isValid !== 0) {
          if (isValid == 1) {
            alert("Erro ao realizar a inclusão!");
            break;
          }
          else if (isValid == -1) {
            alert("Falha de conexão com a API!")
            break;
          }
        }
      }
    }
  }

  TelaCriacaoequipe() {
    this.router.navigate(['/criarequipes']);
  }

  BotaoCancelar() {
    if (confirm('Tem certeza que deseja cancelar a edição da equipe ' + this.nomeEquipe?.nativeElement.value + '?')) {
      this.TelaCriacaoequipe();
    }
  }

  BotaoCancelarParametros() {
    if (confirm('Tem certeza que deseja cancelar a configuração de parâmetros?')) {
      this.fecharModal();
    }
  }

  BotaoCancelarparticipantes() {
    if (confirm('Tem certeza que deseja cancelar a gestão de Participantes? Todas as alterações serão perdidas')) {
      this.participantesSelecionados = [];
      for (const participante of this.participantesSelecionados2) {
        this.participantesSelecionados.push({
          id: participante.id,
          imagem: participante.imagem,
          nome: participante.nome,
          email: participante.email,
          moderador: participante.moderador
        });
      }
      this.fecharparticipantes();
    }
  }

  BotaoGuardarParametros() {
    if (confirm('Tem certeza que deseja Guardar a configuração de parâmetros?')) {


      this.dadosParametrosSalvos = [];
      for (let i = 0; i < this.quantidadeLinhas; i++) {

        const parametroInput = document.getElementById(`parametro-input-${i + 1}`) as HTMLInputElement;
        const importanciaDropdown = document.getElementById(`importancia-dropdown-${i + 1}`) as HTMLSelectElement;
        const notacaoDropdown = document.getElementById(`notacao-dropdown-${i + 1}`) as HTMLSelectElement;

        if (parametroInput && importanciaDropdown && notacaoDropdown) {
          this.dadosParametrosSalvos.push({
            parametro: parametroInput.value,
            importancia: parseInt(importanciaDropdown.value),
            avaliacao: notacaoDropdown.value
          });
        }
      }

      alert("Dados armazenados no sistema, para que sejam de fato assimilados, deve-se confirmar a edição no final da tela.")
      this.fecharModal();
    }
  }

  fecharModal() {
    this.exibirModal = false;
  }

  abrirModal() {
    this.exibirModal = true;
    setTimeout(() => {
      this.carregarDropdownValores();
    }, 0);

    setTimeout(() => {
      const dropdownModelos = document.getElementById('dropdownModelos') as HTMLSelectElement;
      if (dropdownModelos && this.modelo) {
        dropdownModelos.value = this.modelo;
      }

      this.dadosParametrosSalvos.forEach((param, index) => {
        if (index < this.parametros.length) {
          const parametroInput = document.getElementById(`parametro-input-${index + 1}`) as HTMLInputElement;
          const importanciaDropdown = document.getElementById(`importancia-dropdown-${index + 1}`) as HTMLSelectElement;
          const notacaoDropdown = document.getElementById(`notacao-dropdown-${index + 1}`) as HTMLSelectElement;

          if (parametroInput && importanciaDropdown && notacaoDropdown) {
            parametroInput.value = param.parametro;
            importanciaDropdown.value = param.importancia.toString();
            notacaoDropdown.value = param.avaliacao;
          }
        }
      });

    }, 0);

  }

  carregarDropdownValores() {
    const dropdown = document.getElementById('dropdownModelos');
    if (dropdown instanceof HTMLSelectElement) {
      dropdown.innerHTML = '';
      this.NomeModelo.forEach((modelo, index) => {
        const option = document.createElement('option');
        option.value = String(index + 1);
        option.text = modelo;
        dropdown.appendChild(option);
      });

    } 
  }


  aplicarModelo() {

    const dropdownModelos = document.getElementById('dropdownModelos') as HTMLSelectElement;
    if (dropdownModelos) {
      this.modelo = dropdownModelos.value;
    }

    if (this.quantidadeLinhas < 20) {
      const qtd = 20 - this.quantidadeLinhas;
      for (let i = 0; i < qtd; i++) {
        this.adicionarParametro();
      }
    }


    setTimeout(() => {
      this.carregamodelostela();
    }, 0);

  }

  carregamodelostela() {
    const dropdownModelos = document.getElementById('dropdownModelos') as HTMLSelectElement;
    const modeloSelecionado = dropdownModelos.options[dropdownModelos.selectedIndex].text;

    const equipesComModelo = this.modeloequipes.filter(equipe => equipe[0].esporte === modeloSelecionado);

    equipesComModelo.forEach(equipe => {
      equipe.forEach((element, index) => {
        const parametroInput = document.querySelector(`#parametro-input-${index + 1}`) as HTMLInputElement;
        if (parametroInput) {
          parametroInput.value = element.parametro;
        }

        const importanciaDropdown = document.querySelector(`#importancia-dropdown-${index + 1}`) as HTMLSelectElement;
        if (importanciaDropdown) {
          importanciaDropdown.innerHTML = '';

          for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.text = i.toString();
            importanciaDropdown.appendChild(option);
          }
          importanciaDropdown.value = element.peso.toString();
        }
      });
    });
  }

  adicionarParametro() {
    if (this.parametros.length < 20) {
      this.parametros.push({ parametro: '' });
      this.quantidadeLinhas++;
    } else {
      alert('O limite máximo de parâmetros é 20');
    }
  }

  removerParametro(index: number) {
    this.modelo = '';
    this.parametros.splice(index, 1);
    this.quantidadeLinhas--;
  }


  abrirparticipantes() {
    this.carregarParticipantes();
    this.exibirparticipantes = true;
  }

  fecharparticipantes() {
    this.exibirparticipantes = false;
  }

  BotaoPesquisarParticipantes() {
    var id, email;
    const resultado = parseInt(this.procura?.nativeElement.value);
    if (!isNaN(resultado)) {
      id = resultado;
      email = "não";
    }
    else {
      id = 0;
      email = this.procura?.nativeElement.value;
    }


    this.apiService.LevantarParticipantes(id.toString(), email.toString())
      .then(usuario => {
        this.imagem = usuario.foto,
          this.nome = usuario.nome,
          this.email = usuario.email,
          this.id = usuario.id.toString()
        if (this.email == "Inexistente")
          this.existe = false;
        else
          this.existe = true;
      })
      .catch(error => {
        console.error('Erro ao obter o usuário:', error);
      });


  }

  adicionarParticipante() {
    var naoExiste = this.participantesSelecionados.some(a => a.id === this.id);

    if (naoExiste) {
      alert('Usuário indicado já existe na lista de participantes. Não é possível adicionar outro.');
      this.existe = false;
      this.procura!.nativeElement.value = "";
    } else {
      this.participantesSelecionados.push({
        id: this.id,
        imagem: this.imagem,
        nome: this.nome,
        email: this.email,
        moderador: false
      });
      alert("Participante " + this.email + "Adicionado com sucesso!");
      this.existe = false;
      this.procura!.nativeElement.value = "";
    }
  }


  excluirparticipante(id: number, usuario: string) {
    const ID = localStorage.getItem('ID');
    if (ID) {
      if (usuario == ID)
        alert("O usuário não pode se deletar como participante do Grupo!");
      else {
        this.participantesSelecionados.splice(id, 1);
      }
    }
  }

  excluirparticipante2(id: number) {
    const ID = localStorage.getItem('ID');
    confirm("Deseja exluir o participante " + this.participantesSelecionados[id].email + " permanentemente?")
    {
      if (ID) {
        if (this.participantesSelecionados[id].id == ID)
          alert("O usuário não pode se deletar como participante do Grupo!");
        else {
          this.participantesSelecionados.splice(id, 1);
          this.existenalistaparticipantes = false;
        }
      }
    }
  }

  async BotaoGravarParticipantes() {
    const ID = localStorage.getItem('ID');
    var i = 0;
    var moderador = 0;
    for( let participante of this.participantesSelecionados)
    {
      if(participante.moderador == true)
        i++;      
    }
    if(i<=0){
      alert("É necessário ao menos um moderador!");
    }
    else
    {
      if(this.participantesSelecionados.find(a=> a.id == ID)?.moderador == false)
      {
        alert("O usuário não pode se retirar como moderador, esta operação deve ser realizada por outro moderador!");
      }
      else{
        alert("Ajuste de Participantes realizada com sucesso! Para confirmar a alteração pressione confirmar na tela");
        this.carregarParticipantes();
        this.fecharparticipantes();
      }      
    }        
  }

  setarmoderador(i: number) {
    this.participantesSelecionados[i].moderador = !this.participantesSelecionados[i].moderador;    
  }

  carregarParticipantes() {
    this.participantesSelecionados2 = [];
    for (const participante2 of this.participantesSelecionados) {
      this.participantesSelecionados2.push({
        id: participante2.id,
        imagem: participante2.imagem,
        nome: participante2.nome,
        email: participante2.email,
        moderador: participante2.moderador
      });
    }
  }

  botaopesquisarlistaparticipantes() {
    const campo = this.procura2?.nativeElement.value;
    if (campo.length > 0) {
      this.filtrou = true;
      const resultado = parseInt(campo);
      var indice = 0;
      if (!isNaN(resultado)) {
        indice = this.participantesSelecionados.findIndex(a => a.id === resultado.toString());

      } else {
        indice = this.participantesSelecionados.findIndex(a => a.email === campo);
      }
      if (indice !== -1) {
        this.existenalistaparticipantes = true;
        const participante = this.participantesSelecionados[indice];
        this.imagempesquisalistaparticipante = participante.imagem;
        this.emailpesquisalistaparticipante = participante.email;
        this.idpesquisalistaparticipante = indice;
        this.moderadorpesquisalistaparticipante = participante.moderador;
        this.nomepesquisalistaparticipante = participante.nome;
      } else {
        this.existenalistaparticipantes = false;
      }
    }
    else {
      this.Limpapesquisarlistaparticipantes();
    }
  }

  Limpapesquisarlistaparticipantes() {
    this.filtrou = false;
    this.procura2!.nativeElement.value = "";
  }

  async onImageSelected(event: any) {
    const index = localStorage.getItem('idtela');
    if (index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Marque a função de callback como async
        reader.onload = async (e: any) => {
          const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
          if (selectedImage) {
            selectedImage.src = e.target.result;
          }
          this.imagePath2 = e.target.result;
        };

        reader.readAsDataURL(file);
        event.target.value = '';
        
        
      }
    }

  }

  TelaInicial() {
    this.router.navigate(['/inicio']);
  }

}
