import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

interface NotaAgrupada {
  [key: string]: string;
}

@Component({
  selector: 'app-avaliacoespendentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avaliacoespendentes.component.html',
  styleUrl: './avaliacoespendentes.component.css'
})
export class AvaliacoespendentesComponent {
  @ViewChild('procura') procura: ElementRef | undefined;

  imagePath: string = '';
  IdUsuario: string = '';
  nomeUsuario: string = '';
  filtrou: boolean = false;
  existe: boolean = false;
  paginaAtual = 1;
  eventosPorPagina = 3;
  nomeequipe: string = '';
  selecaoAtual: string = "0";
  

  eventos: {
    id: number,
    nome: string,
    nomeevento: string,
    idevento: number,
    foto: string,
    statuseventos: string
    data: string,
    datasemtratamento: string,
  }[] = [];

  eventos2: {
    id: number,
    nome: string,
    nomeevento: string,
    idevento: number,
    foto: string,
    statuseventos: string,
    data: string,
    datasemtratamento: string,
  }[] = [];

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
    await this.carregarEquipe();
    
    if(window.innerWidth > 999 )
      {
        this.eventosPorPagina = 3;
      }
      else
      {
        if(window.innerWidth > 599 )
        {
          this.eventosPorPagina = 2;  
        }
        else
        {
          this.eventosPorPagina = 999;
        }
        
      }

  }

  carregarDadosUsuario() {
    const Usuario = localStorage.getItem('Usuario');
    const ID = localStorage.getItem('ID');
    const Imagem = localStorage.getItem('imagem');
    this.nomeUsuario = Usuario ? Usuario.toString() : '';
    this.IdUsuario = ID ? ID.toString() : '';
    this.imagePath = Imagem ? Imagem.toString() : '../../assets/avatar 1.png';

  }

  async carregarEquipe() {
    try {
      const ID = localStorage.getItem('idtelaEquipe');
      const IDusu = localStorage.getItem('ID');
      const equipe = await this.apiService.obterUmaEquipes(ID?.toString() ? ID?.toString() : "");
      this.nomeequipe = equipe.nome;

      const Eventos = await this.apiService.obterTodosEventos(ID?.toString() ? ID?.toString() : "");

      for (const element of Eventos) {
        const dados = {
          idEvento: element.id,
          idUsuario: IDusu
        }
        const notas = await this.apiService.obterNotasEventoUsuarioOrigem(dados);

        const notasPorData: NotaAgrupada = {};

        for (const element2 of notas) {

          const dataAgrupamento = this.formatarData(element2.notaId.dataHoraEvento);

          if ((this.selecaoAtual == "0" && element2.avaliado == null) || (this.selecaoAtual == "1" && element2.avaliado == "A") || this.selecaoAtual == "2") {

            if (!notasPorData[dataAgrupamento]) {
              notasPorData[dataAgrupamento] = dataAgrupamento;
              this.eventos.push({
                id: equipe.id,
                nome: equipe.nome,
                nomeevento: element.nome,
                idevento: element.id,
                foto: equipe.foto,
                statuseventos: element2.avaliado,
                data: dataAgrupamento,
                datasemtratamento: element2.notaId.dataHoraEvento
              });
            }
          }
        }
      }

    } catch (error) {
      this.showAlert('Erro ao carregar equipe: ' + error);

    }
  }



  usuario() {
    this.router.navigate(['/usuario']);
  }

  async logout() {
    const confirmation = await this.showConfirm('Deseja mesmo fazer o log-off?');
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
  Telausuarioequipe() {
    this.router.navigate(['/usuarioequipe']);
  }

  botaopesquisarlistaeventos() {
    this.paginaAtual = 1;
    this.eventos2 = [];
    const valorProcura = this.procura?.nativeElement.value.trim();
    if (valorProcura) {
      if (valorProcura.length > 0) {
        this.filtrou = true;

        this.eventos2 = this.eventos.filter(equipe =>
          equipe.data === valorProcura
        );
        if (this.eventos2.length == 0) {
          this.existe = false;
        }
        else {
          this.existe = true;
        }
        if (!this.existe) {
          this.eventos2 = this.eventos.filter(equipe =>
            equipe.data.includes(valorProcura)
          );
          if (this.eventos2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          } 
        }
        if (!this.existe) {
          this.eventos2 = this.eventos.filter(equipe => equipe.nome.toLowerCase() === valorProcura.toLowerCase());
          if (this.eventos2.length == 0) {
            this.existe = false;
          }
          else {
            this.existe = true;
          }
        }
      }
    }
  }

  Limpapesquisarlistaeventos() {
    this.paginaAtual = 1;
    this.filtrou = false;
    this.procura!.nativeElement.value = "";
  }

  get eventosNaPaginaAtual() {
    const inicio = (this.paginaAtual - 1) * this.eventosPorPagina;
    const fim = inicio + this.eventosPorPagina;
    return this.eventos.slice(inicio, fim);
  }

  get eventosNaPaginaAtual2() {
    const inicio = (this.paginaAtual - 1) * this.eventosPorPagina;
    const fim = inicio + this.eventosPorPagina;
    return this.eventos2.slice(inicio, fim);
  }

  get totalDePaginas() {
    return this.eventos.length == 0 ? 1 : Math.ceil(this.eventos.length / this.eventosPorPagina);
  }

  get totalDePaginas2() {
    return this.eventos2.length == 0 ? 1 : Math.ceil(this.eventos2.length / this.eventosPorPagina);
  }

  mudarPagina(numero: number) {
    this.paginaAtual += numero;
    // Certifique-se de não ultrapassar o número total de páginas ou ir abaixo da página 1
    this.paginaAtual = Math.max(1, Math.min(this.paginaAtual, Math.ceil(this.eventos.length / this.eventosPorPagina)));
  }

  formatarData(dataString: string) {
    const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const data = new Date(dataString);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }

  salvarSelecao() {
    const combo = document.getElementById("EquipeEvento") as HTMLSelectElement;
    if (combo) {
      this.selecaoAtual = combo.value;
    }
    this.eventos = [];
    this.carregarEquipe();
  }

  TelaAvaliacao(data: string, id: number)
  {
    localStorage.setItem('avaliacaoparticipantes_id', id.toString());
    localStorage.setItem('avaliacaoparticipantes_dataavaliacao', data);
    this.router.navigate(['/avaliacaoparticipantes']);
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


  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const confirmBox = document.getElementById("customConfirm");
      const confirmMessage = document.getElementById("confirmmessage_customConfirm");
      const overlay = document.getElementById("overlay_customConfirm");
  
      if(confirmMessage && overlay && confirmBox) {
        confirmMessage.textContent = message;
        overlay.style.display = "block"; // Show the overlay
        confirmBox.style.display = "block"; // Show the confirm box
      }
  
      // Store the resolve function to use it later
      (confirmBox as any).resolvePromise = resolve;
    });
  }
  
  handleConfirm(result: boolean): void {
    const confirmBox = document.getElementById("customConfirm");
    const overlay = document.getElementById("overlay_customConfirm");
  
    if(overlay && confirmBox) {
      confirmBox.style.display = "none"; // Hide the confirm box
      overlay.style.display = "none"; // Hide the overlay
    }
  
    // Call the resolve function with the result
    if ((confirmBox as any).resolvePromise) {
      (confirmBox as any).resolvePromise(result);
    }
  }


}
