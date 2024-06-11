import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';

interface Participante {
  id: string;
  imagem: string;
  nome: string;
  email: string;
  Pagou: boolean;
}

interface DadosEvento {
  id: number;
  equipe: number;
  nome: string;
  local: string;
  peridiocidade: string;
  dia: string;
  hora: string;
  quantidade_time: number;
  chavepix: string;
  duracao: string;
}


interface Competidor {
  nome: string;
  email: string;
  imagem: string;
  id: string;
}

interface Time {
  nomeTime: string;
  competidores: Competidor[];
}

@Component({
  selector: 'app-detalheevento',
  standalone: true,
  imports: [CommonModule], // Certifique-se de incluir GoogleMapsModule
  templateUrl: './detalheevento.component.html',
  styleUrls: ['./detalheevento.component.css']
})
export class DetalheeventoComponent {
  @ViewChild('localevento') localevento: ElementRef | undefined;
  @ViewChild('localevento2') localevento2: ElementRef | undefined;
  @ViewChild('localevento3') localevento3: ElementRef | undefined;
  @ViewChild('nomeEquipe') nomeEquipe: ElementRef | undefined;
  @ViewChild('IdEvento') IdEvento: ElementRef | undefined;
  @ViewChild('nomeevento') nomeevento: ElementRef | undefined;
  @ViewChild('horaevento') horaevento: ElementRef | undefined;
  @ViewChild('duracaoevento') duracaoevento: ElementRef | undefined;  
  @ViewChild('diaevento') diaevento: ElementRef | undefined;
  @ViewChild('segunda') segunda: ElementRef | undefined;
  @ViewChild('terca') terca: ElementRef | undefined;
  @ViewChild('quarta') quarta: ElementRef | undefined;
  @ViewChild('quinta') quinta: ElementRef | undefined;
  @ViewChild('sexta') sexta: ElementRef | undefined;
  @ViewChild('sabado') sabado: ElementRef | undefined;
  @ViewChild('domingo') domingo: ElementRef | undefined;
  @ViewChild('procura2') procura2: ElementRef | undefined;
  @ViewChild('quantidade') quantidade: ElementRef | undefined;
  @ViewChild('chavepix') chavepix: ElementRef | undefined;
  




  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;


  imagePath: string = '';
  imagePath2: string = '../../assets/dado.png';
  IdUsuario: string = '';
  nomeUsuario: string = '';
  tipotela: string = "";
  LetitudeLongetude: any;
  exibirmapa: boolean = false;
  abriumapa: boolean = false;
  frequencia: boolean = false;
  Novolocaleveto: string = "";
  Seg: boolean = false;
  Ter: boolean = false;
  Qua: boolean = false;
  Qui: boolean = false;
  Sex: boolean = false;
  Sab: boolean = false;
  Dom: boolean = false;
  dia: string = "";
  origem: string = "";

  exibircustos: boolean = false;
  filtrou: boolean = false;
  existenalistaparticipantes: boolean = false;
  Pagadorpesquisalistaparticipante: boolean = false;
  exibirsorteio: boolean = false;
  sorteio: boolean = false;

  imagempesquisalistaparticipante: string = "";
  nomepesquisalistaparticipante: string = "";
  emailpesquisalistaparticipante: string = "";
  ChavePix: string = "";

  idpesquisalistaparticipante: number = 0;
  qtdTime: number = 0;

  participantesSelecionados: Array<{ id: string, imagem: string; nome: string; email: string; moderador: boolean; Pagou: boolean }> = [];
  participantesSelecionados2: Array<{ id: string, imagem: string; nome: string; email: string; moderador: boolean; Pagou: boolean }> = [];
  TimesExistentes: Array<{
    nomeTime: string;
    competidores: Competidor[];
  }> = [];
  TimesExistentes2: Array<{
    nomeTime: string;
    competidores: Competidor[];
  }> = [];

  private map?: google.maps.Map;
  private mapClickListener?: google.maps.MapsEventListener;


  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
  }


  async ngOnInit() {
    localStorage.setItem('Teladecadastro', "false");
    this.carregarDadosUsuario();
    setTimeout(() => {
      this.CarregarDadosTela();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  inicializarMapa(lat: number = -23.5505, lng: number = -46.6333, zoom: number = 15): void {
    const center = new google.maps.LatLng(lat, lng);
    if (!this.map) {
      const mapOptions = {
        center: center,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    } else {
      this.map.setCenter(center);
      this.map.setZoom(zoom);
    }

    this.adicionarOuvinteDeClique();
  }

  adicionarOuvinteDeClique(): void {
    if (this.map && !this.mapClickListener) { // Supondo que mapClickListener seja uma propriedade da classe
      this.mapClickListener = this.map.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
        if (mapsMouseEvent.latLng) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'location': mapsMouseEvent.latLng.toJSON() }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
              const address = results[0].formatted_address;
              if (this.tipotela == 'A')
                this.localevento3!.nativeElement.value = address;
            } else {
              console.error('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
      });
    }
  }




  fecharmapa() {

    if (this.mapContainer) {
      while (this.mapContainer.nativeElement.firstChild) {
        this.mapContainer.nativeElement.removeChild(this.mapContainer.nativeElement.firstChild);
      }
    }
    if (this.mapClickListener) {
      google.maps.event.removeListener(this.mapClickListener);
      this.mapClickListener = undefined;
    }
    this.map = undefined;

    this.exibirmapa = false;

  }

  abrirmapa(): void {
    this.exibirmapa = true;
    this.Novolocaleveto = this.localevento?.nativeElement.value.substring(7);
    setTimeout(() => {
      this.inicializarMapa();
    }, 0);
    this.indicarnomapa();
  }

  pesquisarLocal() {
    this.Novolocaleveto = this.localevento2?.nativeElement.value;
    this.indicarnomapa();
  }

  indicarnomapa(): void {

    const endereco = this.Novolocaleveto;

    if (endereco.length > 0) {
      if (endereco) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': endereco }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK && results && results[0]) {
            const location = results[0].geometry.location;
            if (this.map) {
              this.map.setCenter(location);
              this.map.setZoom(18); // Você pode ajustar o nível de zoom conforme necessári
            }
            if (this.tipotela == 'A')
              this.localevento3!.nativeElement.value = endereco;
            // Se desejar, também pode adicionar um marcador no local pesquisado
            new google.maps.Marker({
              map: this.map,
              position: location
            });
          } else {
            this.showAlert("Não foi possível encontrar o local: " + endereco);
          }
        });
      }
    }
  }



  geocodificarEndereco(): void {
    const endereco = this.Novolocaleveto;
    if (endereco) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': endereco, 'region': 'BR' }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          this.inicializarMapa(location.lat(), location.lng(), 16);
        } else {
          this.showAlert('Geocode was not successful for the following reason: ' + status);
          this.inicializarMapa(); // Carrega a Praça da Sé por padrão se a geocodificação falhar
        }
      });
    } else {
      this.inicializarMapa(); // Carrega a Praça da Sé por padrão se nenhum endereço for especificado
    }
  }



  carregarDadosUsuario() {
    const tipotela = localStorage.getItem('tipo');
    this.tipotela = tipotela ? tipotela.toString() : '';
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';
    const origem = localStorage.getItem('origem');
    this.origem = origem ? origem.toString() : '';
  }

  usuario() {
    this.router.navigate(['/usuario']);
  }

  logout() {
    this.showConfirm('Deseja realmente fazer o log-off?', (confirmation: boolean) => {
      if (confirmation) {
        localStorage.setItem('imagem', "");
        localStorage.setItem('Usuario', "");
        localStorage.setItem('ID', "");
        this.router.navigate(['/home']); // Redireciona para a tela de login
      }
    });
  }

  TelaInicial() {
    this.router.navigate(['/inicio']);
  }

  TelaCriacaoevento() {
    if(this.origem == 'criacao')
      this.router.navigate(['/criarevento']);
    else
      this.router.navigate(['/inicio']);
  }

  SetaFrequenciaEvento() {
    this.frequencia = !this.frequencia;
  }

  confirmaLocal() {
    if (this.localevento3?.nativeElement.value.length > 0) {
      this.showConfirm('Tem certeza que gostaria de indicar o local selecionado como local do evento?', (confirmation: boolean) => {
      	if (confirmation) {
          this.localevento!.nativeElement.value = "Local: " + this.localevento3?.nativeElement.value;
          this.fecharmapa();
        }
      });
    }
    else
    this.showAlert("Para poder confirmar a nova localização, deve-se primeiro definir uma nova localização!")
  }

  cancelaLocal() {
    this.showConfirm('Tem certeza que não gostaria de indicar o local do evento?', (confirmation: boolean) => {
      if (confirmation) {
        this.fecharmapa();
      }
    });  
  }


  async CarregarDadosTela() {
    const ID = localStorage.getItem('idtelaEquipe');
    const equipe = await this.apiService.obterUmaEquipes(ID?.toString() ? ID?.toString() : "");
    this.imagePath2 = equipe.foto;
    this.nomeEquipe!.nativeElement.value = "Equipe: " + equipe.nome;
    
    

    const IDEvento = localStorage.getItem('idtela');
    
    const evento = await this.apiService.obterUmEvento(IDEvento?.toString() ? IDEvento?.toString() : "");
    
    if(evento.chavepix)
      this.ChavePix = evento.chavepix;
    
    this.IdEvento!.nativeElement.value = "Id Evento: " + evento.id;
    this.nomeevento!.nativeElement.value = "Nome Evento: " + evento.nome;
    if (evento.local.length > 0)
      this.localevento!.nativeElement.value = "Local: " + evento.local;
    this.horaevento!.nativeElement.value = evento.hora;
    this.duracaoevento!.nativeElement.value = evento.duracao;
    
    
    this.qtdTime = evento.quantidade_time;
    let selectElement = document.getElementById("EquipeEvento") as HTMLSelectElement;

    if (evento.dia.includes(";") || (evento.dia == "")) {
      selectElement.value = "0";
      this.frequencia = false;
      if (evento.dia.includes("Seg"))
        this.Seg = true;
      if (evento.dia.includes("Ter"))
        this.Ter = true;
      if (evento.dia.includes("Qua"))
        this.Qua = true;
      if (evento.dia.includes("Qui"))
        this.Qui = true;
      if (evento.dia.includes("Sex"))
        this.Sex = true;
      if (evento.dia.includes("Sab"))
        this.Sab = true;
      if (evento.dia.includes("Dom"))
        this.Dom = true;
    }
    else {
      selectElement.value = "1";
      this.frequencia = true;
      setTimeout(() => {
        this.diaevento!.nativeElement.value = evento.dia;
      }, 0);
    }
    const participantes = await this.apiService.obterTodosParticipantesEquipe(ID?.toString() ? ID?.toString() : "0");
    const pagantes = await this.apiService.obterTodosPagantesporevento(IDEvento?.toString() ? IDEvento?.toString() : "0");


    participantes.forEach(element => {
      this.apiService.LevantarParticipantes(element.usuario, "k")
        .then(usuario => {
          const paganteEncontrado = pagantes.find(pagante => pagante.usuario.toString() === usuario.id.toString());
          this.participantesSelecionados.push({
            id: usuario.id.toString(),
            imagem: usuario.foto,
            nome: usuario.nome,
            email: usuario.email,
            moderador: element.moderador,
            Pagou: paganteEncontrado ? paganteEncontrado.custo : false
          });
        })
        .catch(error => {

          this.showAlert('Erro ao obter o usuário:' + error);
        });
    });


    try {
      const Times = await this.apiService.obterTodosTimesEvento(IDEvento?.toString() || "0");
      if (Times.length > 0) {
        const maiorNumeroTime = Times.reduce((max, time) => time.numerotime > max ? time.numerotime : max, Times[0].numerotime);
        for (let i = 0; i < maiorNumeroTime; i++) {
          this.TimesExistentes.push({
            nomeTime: "Time " + (i + 1).toString(),
            competidores: []
          });
        }
        for (let element of Times) {
          try {
            const usuario = await this.apiService.LevantarParticipantes(element.usuario.toString(), "k");
            this.TimesExistentes[element.numerotime - 1].competidores.push({
              imagem: usuario.foto,
              nome: usuario.nome,
              email: usuario.email,
              id: usuario.id.toString()
            });
          } catch (error) {
            console.error('Erro ao obter o usuário:', error);
          }
        }

        if (this.TimesExistentes.length > 0)
          this.sorteio = true;
      }

    } catch (error) {
      this.showAlert('Erro ao obter os times:' + error);
    }

  }

  async Gravadados() {
    const local = this.localevento?.nativeElement.value.substring(7);
    const hora = this.horaevento?.nativeElement.value;
    const duracao = this.duracaoevento?.nativeElement.value;
    const IDEquipe = parseInt(localStorage.getItem('idtelaEquipe') || '0', 10);
    const IdEvento = this.IdEvento?.nativeElement.value.substring(11);
    const nomeEvento = this.nomeevento?.nativeElement.value.substring(13);
    const peridiocidade = this.frequencia;
    var dia = "";
    var erro = "";
    if (!this.frequencia) {
      const segunda = this.segunda?.nativeElement.checked;
      const terca = this.terca?.nativeElement.checked;
      const quarta = this.quarta?.nativeElement.checked;
      const quinta = this.quinta?.nativeElement.checked;
      const sexta = this.sexta?.nativeElement.checked;
      const sabado = this.sabado?.nativeElement.checked;
      const domingo = this.domingo?.nativeElement.checked;
      if (segunda)
        dia += "Seg;"
      if (terca)
        dia += "Ter;"
      if (quarta)
        dia += "Qua;"
      if (quinta)
        dia += "Qui;"
      if (sexta)
        dia += "Sex;"
      if (sabado)
        dia += "Sab;"
      if (domingo)
        dia += "Dom;"
    }
    else {
      dia = this.diaevento?.nativeElement.value;
    }

    if (local.length == 0)
      erro += "1;";
    if (hora.length == 0)
      erro += "2;";
    if (dia.length == 0)
      erro += "3;";
    
      var dataHoraEvento =new Date();
      const agora = new Date();
      
      if(this.frequencia)
      {
        
        if (dia && hora) {
          // Concatena a data e a hora para criar uma string completa 'YYYY-MM-DDTHH:mm'
          const dataHoraEventoStr = `${dia}T${hora}`;
          dataHoraEvento = new Date(dataHoraEventoStr);
                  
          if (dataHoraEvento < agora) {
            erro += "4;";
          } 
        }
      }

      const participantesQuePagaram = this.participantesSelecionados.filter(part => part.Pagou);
      const participantesQuePagaramEEstaoNosTimes = participantesQuePagaram.filter(part =>
        this.TimesExistentes.some(time => time.competidores.some(comp => comp.id === part.id))
      );
      
      const pagaramMasNaoEstaoNosTimes = participantesQuePagaram.filter(part =>
        !participantesQuePagaramEEstaoNosTimes.includes(part)
      );
      
      if (pagaramMasNaoEstaoNosTimes.length > 1) {
        erro += "5;";
        pagaramMasNaoEstaoNosTimes.forEach(part => console.log(`${part.nome} (${part.email})`));
      }

      const competidoresNosTimes = this.TimesExistentes.flatMap(time => time.competidores.map(comp => comp.id));
      const participantesQueNaoPagaramNosTimes = this.participantesSelecionados.filter(part =>
        !part.Pagou && competidoresNosTimes.includes(part.id)
      );

      if (participantesQueNaoPagaramNosTimes.length > 0) {
        erro += "6;";
        participantesQueNaoPagaramNosTimes.forEach(part => console.log(`${part.nome} (${part.email})`));
      }

      
      if (duracao.length == 0) {
        erro += "7;";
      }

      if (duracao == "00:00") {
        erro += "8;";
      }


      if (duracao == "00:01"||duracao == "00:02"||duracao == "00:03"||duracao == "00:04"||duracao == "00:05"||duracao == "00:06"||duracao == "00:07"||duracao == "00:08"||duracao == "00:09") {
        erro += "9;";
      }

      

    if (erro.length > 0) {
      var mensagem = "";
      if (erro.toString().includes("1;"))
        mensagem += " - Local não foi preenchido; \n";
      if (erro.toString().includes("2;"))
        mensagem += " - Hora não foi preenchido; \n";
      if (erro.toString().includes("3;"))
        mensagem += " - Dia não foi preenchido com um período ou data válida; \n";
      if (erro.toString().includes("4;"))
        mensagem += ` - A data e hora do evento (${this.formatarDataHora(dataHoraEvento)}) não podem ser anteriores à data e hora atuais (${this.formatarDataHora(agora)})! Favor Ajustar. \n`
      if (erro.toString().includes("7;")){
        mensagem += ` - Evento deve possuir a indicação de duração, para que o sistema possa iniciar e finalizar este corretamente! \n`
      }
      if (erro.toString().includes("8;")){
        mensagem += ` - Evento deve possuir a indicação de duração diferente de 00:00, para que o sistema possa iniciar e finalizar este corretamente! \n`
      }
      if (erro.toString().includes("9;")){
        mensagem += ` - Evento deve possuir a indicação de duração superior a 00:09, para que o sistema possa Funcionar corretamente \n`
      }
      if (erro.toString().includes("5;")){
        mensagem += ` - Existem Participantes que pagaram mas não estão nos times existentes, sendo eles: \n`
        pagaramMasNaoEstaoNosTimes.forEach(part => mensagem +=`${part.nome} (${part.email}); \n`);
        mensagem +="Favor realizar novo sorteio! \n"
      }
      if (erro.toString().includes("6;")){
        mensagem += ` - Existem Participantes que não pagaram mas estão nos times existentes, sendo eles: \n`
        participantesQueNaoPagaramNosTimes.forEach(part => mensagem +=`${part.nome} (${part.email}); \n`);
        mensagem +="Favor realizar novo sorteio! \n"
      }       
        
      this.showAlert("Existem criticas que impedem a alteração do evento, sendo elas: \n" + mensagem)
    }
    else {

      this.showConfirm("Deseja realizar de fato a alteração no evento " + this.nomeevento?.nativeElement.value.substring(13) + "?", (confirmation: boolean) => {
      	if (confirmation) {
          const dadosEvento:DadosEvento = {
            id: IdEvento,
            equipe: IDEquipe,
            nome: nomeEvento,
            local: local,
            peridiocidade: peridiocidade ? "Único" : "Semanal",
            dia: dia,
            hora: hora,
            quantidade_time: this.qtdTime,
            chavepix: this.ChavePix,
            duracao: duracao
          };
          this.Gravadadosaux(dadosEvento);
        }
      });
    }
  }

  async Gravadadosaux(dadosEvento : DadosEvento){    
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
    const isValid = await this.apiService.AlterarEvento(dadosEvento);
   

    if (isValid !== 0) {
      if (isValid == 1) {
        this.showAlert("Erro ao realizar a inclusão!");

      }
      else if (isValid == -1) {
        this.showAlert("Falha de conexão com a API!")
      }
    }
    else {
      setTimeout(() => {
        this.ajusteparticipante();
      }, 0);

      setTimeout(() => {
        this.ajusteTimes();
      }, 0);

      this.showAlert("Alteração realizada com sucesso!");

      this.TelaCriacaoevento();
    }

    if (modal) {
      modal.style.display = 'none';
    }
    
  }

  BotaoGravarSorteio() {
    this.showAlert("Dados de sorteio Guardados em memória, para guardar os dados em definitivo, favor pressionar Confirmar!");
    this.fecharsorteio();
  }

  BotaoCancelarSorteio(){
    this.showConfirm('Deseja realizar de fato o cancelamento do sorteio?', (confirmation: boolean) => {
      if (confirmation) {
        this.TimesExistentes = this.TimesExistentes2;
        this.fecharsorteio();
      }
    });
  }

  TelaCriarEvento() {
    this.router.navigate(['/criarevento']);
  }

  Canceladados() {    
    this.showConfirm("Deseja realizar de fato o cancelamento da alteração no evento " + this.nomeevento?.nativeElement.value.substring(13) + "?", (confirmation: boolean) => {
      if (confirmation) {
        this.TelaCriacaoevento();
      }
    });
  }

  fecharcustos() {
    this.exibircustos = false;
  }

  AbrirCustos() {
    this.exibircustos = true;
    this.carregarParticipantes()
    if (this.filtrou)
      this.LimpapesquisarlistaparticipantesCusto();
    
    setTimeout(() => {
      this.chavepix!.nativeElement.value = this.ChavePix;
    }, 0);
    
  }

  async BotaoGravarParticipantesCusto() {
    this.showAlert("Ajuste de Participantes realizada com sucesso! Para confirmar a alteração pressione confirmar na tela");
    this.ChavePix = this.chavepix?.nativeElement.value;
    this.carregarParticipantes()
    this.fecharcustos();
  }

  carregarParticipantes() {
    this.participantesSelecionados2 = [];
    for (const participante2 of this.participantesSelecionados) {
      this.participantesSelecionados2.push({
        id: participante2.id,
        imagem: participante2.imagem,
        nome: participante2.nome,
        email: participante2.email,
        moderador: participante2.moderador,
        Pagou: participante2.Pagou
      });
    }
    
  }

  BotaoCancelarparticipantesCusto() {
    this.showConfirm('Tem certeza que deseja cancelar a gestão de Custos? Todas as alterações serão perdidas', (confirmation: boolean) => {
      if (confirmation) {
        this.participantesSelecionados = [];
        for (const participante of this.participantesSelecionados2) {
          this.participantesSelecionados.push({
            id: participante.id,
            imagem: participante.imagem,
            nome: participante.nome,
            email: participante.email,
            moderador: participante.moderador,
            Pagou: participante.Pagou
          });
        }
        this.fecharcustos();
      }
    });    
  }

  setarpagador(i: number) {
    this.participantesSelecionados[i].Pagou = !this.participantesSelecionados[i].Pagou;
  }


  botaopesquisarlistaparticipantesCusto() {
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
        this.Pagadorpesquisalistaparticipante = participante.Pagou;
        this.nomepesquisalistaparticipante = participante.nome;
      } else {
        this.existenalistaparticipantes = false;
      }
    }
    else {
      this.LimpapesquisarlistaparticipantesCusto();
    }
  }

  LimpapesquisarlistaparticipantesCusto() {
    this.filtrou = false;
    this.procura2!.nativeElement.value = "";
  }

  abrirsorteio() {
    this.exibirsorteio = true;
    this.TimesExistentes2 = this.TimesExistentes;
    if(this.qtdTime>0){
      setTimeout(() => {
        this.quantidade!.nativeElement.value = this.qtdTime;
      }, 0);
    }  
  }

  fecharsorteio() {
    this.exibirsorteio = false;
  }

  sorteiotimes() {
    this.sorteio = true;
    this.qtdTime = this.quantidade?.nativeElement.value;

    if (this.qtdTime > 0) {
      // Filtrar participantes que pagaram
      const participantesPagos = this.participantesSelecionados.filter(participante => participante.Pagou);
      if(participantesPagos.length < 2)
      {
        this.showAlert("Deve haver pelo menos dois participantes para que seja possível realizar o sorteio!");
        if(this.TimesExistentes.length > 0 )
        {
          this.showAlert("Vamos limpar a listagem de equipes, pois não há participantes suficientes para a realização do evento!"); 
        }
        this.TimesExistentes = [];
      }
      else{
      // Embaralhar os participantes pagos
      const participantesEmbaralhados = this.embaralharParticipantes(participantesPagos);

      // Dividir os participantes em times
      const times: Time[] = [];
      let nomeTimeIndex = 1;
      while (participantesEmbaralhados.length > 0) {
        const competidores = participantesEmbaralhados.splice(0, this.qtdTime).map(participante => ({
          nome: participante.nome,
          email: participante.email,
          imagem: participante.imagem,
          id: participante.id
        }));

        times.push({
          nomeTime: `Time ${nomeTimeIndex}`,
          competidores: competidores,
        });

        nomeTimeIndex++;
      }

      this.TimesExistentes = times;
    }
    }
    else {
      this.showAlert("O valor mínimo para cada time deve ser 1!")
    }
  }

  embaralharParticipantes(participantes: Participante[]): Participante[] {
    for (let i = participantes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participantes[i], participantes[j]] = [participantes[j], participantes[i]]; // Troca
    }
    return participantes;
  }


  async ajusteparticipante() {


    var dadosParticipante = {
      evento: "1",
      usuario: "1",
      custo: false,
    };

    const IDTELA = localStorage.getItem('idtela');
    var i = 0;
    if (IDTELA) {
      for (const participante of this.participantesSelecionados) {
        dadosParticipante.evento = IDTELA;
        dadosParticipante.usuario = participante.id;
        dadosParticipante.custo = participante.Pagou;

        const isValid = await this.apiService.CriarCustoParticipante(dadosParticipante, i);
        i++;

        if (isValid !== 0) {
          if (isValid == 1) {
            this.showAlert("Erro ao realizar a inclusão!");
            break;
          }
          else if (isValid == -1) {
            this.showAlert("Falha de conexão com a API!")
            break;
          }
        }
      }
    }
  }

  async ajusteTimes() {
    var dadosTime = {
      evento: '0',
      numerotime: 0,
      usuario: '0'
    };

    const IDTELA = localStorage.getItem('idtela');
    var j = 0;
    var i = 1;
    if (IDTELA) {
      dadosTime.evento = IDTELA;
      if(this.TimesExistentes.length == 0)
        await this.apiService.CriarTime(dadosTime, j);
      else{
      for (const Time of this.TimesExistentes) {
        dadosTime.numerotime = i;
        for (const Competidor of Time.competidores) {
          dadosTime.usuario = Competidor.id;          
          const isValid = await this.apiService.CriarTime(dadosTime, j);
          j++;
          if (isValid !== 0) {
            if (isValid == 1)
              this.showAlert("Erro ao realizar a inclusão!");
            else if (isValid == -1) {
              this.showAlert("Falha de conexão com a API!")
            }
          }

        }
        i++;
      }
    }
    }

  }

  formatarDataHora(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // getMonth() é baseado em zero
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  showAlert(message: string): Promise<boolean> {
    const confirmBox = document.getElementById("customAlert") as HTMLDivElement;
    const confirmMessage = document.getElementById("alertmessage_customAlert") as HTMLParagraphElement;
    const overlay = document.getElementById("overlay_alertBox") as HTMLDivElement;
    return new Promise((resolve) => {

      confirmMessage.textContent = message;
      overlay.style.display = "block"; // Show the overlay
      confirmBox.style.display = "block"; // Show the confirm box

      // Assign resolve function to the buttons
      (document.getElementById("okbtn_customAlert") as HTMLButtonElement).onclick = () => {
        resolve(true);
        this.hideConfirm();
      };
    });
    
  }
  
  hideConfirm(): void {
    var alertBox = document.getElementById("customAlert");
    var overlay_alertBox = document.getElementById("overlay_alertBox");
  
    if(alertBox && overlay_alertBox)
    {
      alertBox.style.display = "none"; // Hide the alert
      overlay_alertBox.style.display = "none"; // Hide the overlay_alertBox
    }
  }


  
  showConfirm(message: string, callback: (result: boolean) => void): void {
    var confirmBox = document.getElementById("customConfirm");
    var confirmMessage = document.getElementById("confirmmessage_customConfirm");
    var overlay = document.getElementById("overlay_customConfirm");
    
    if(confirmMessage && overlay && confirmBox)
    {
      confirmMessage.textContent = message;
      overlay.style.display = "block"; // Show the overlay
      confirmBox.style.display = "block"; // Show the confirm box
    }   

    // Store the callback to use it later
    (confirmBox as any).callback = callback;
  }

  handleConfirm(result: boolean): void {
    var confirmBox = document.getElementById("customConfirm");
    var overlay = document.getElementById("overlay_customConfirm");

    if(overlay && confirmBox)
    {
      confirmBox.style.display = "none"; // Hide the confirm box
      overlay.style.display = "none"; // Hide the overlay
    }
    // Call the callback with the result
    if ((confirmBox as any).callback) {
      (confirmBox as any).callback(result);
    }
  }


  
}
