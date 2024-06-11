import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-notausuarioevento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notausuarioevento.component.html',
  styleUrl: './notausuarioevento.component.css'
})
export class NotausuarioeventoComponent {
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;

  imagePath: string = '';
  IdUsuario: string = '';
  nomeUsuario: string = '';
  nomeevento: string = '';
  media: number = 0;

  Dadosusuario: Array<{ nome: string; media: number; peso: number; tipo: number, numero: number }> = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.carregarDadosUsuario();
      }
    });
    this.carregarEquipe();
  }

  ngOnInit() {
    localStorage.setItem('Teladecadastro', "false");
    this.carregarDadosUsuario();
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
      const equipe = await this.apiService.obterUmaEquipes(ID?.toString() ? ID?.toString() : "");
      const media = 0;
      var parts = equipe.nomeparametro1.split(";").slice(0, -1);


      const ideventoasasas =  localStorage.getItem('notasrecebidas_id');
      const evento = await this.apiService.obterUmEvento(ideventoasasas?.toString() ? ideventoasasas?.toString() : "");
      this.nomeevento = evento.nome;
      for (let i = 1; i < 21; i++) {

        switch (i) {
          case 1:
            parts = equipe.nomeparametro1.split(";").slice(0, -1);
            break;
          case 2:
            parts = equipe.nomeparametro2.split(";").slice(0, -1);
            break;
          case 3:
            parts = equipe.nomeparametro3.split(";").slice(0, -1);
            break;
          case 4:
            parts = equipe.nomeparametro4.split(";").slice(0, -1);
            break;
          case 5:
            parts = equipe.nomeparametro5.split(";").slice(0, -1);
            break;
          case 6:
            parts = equipe.nomeparametro6.split(";").slice(0, -1);
            break;
          case 7:
            parts = equipe.nomeparametro7.split(";").slice(0, -1);
            break;
          case 8:
            parts = equipe.nomeparametro8.split(";").slice(0, -1);
            break;
          case 9:
            parts = equipe.nomeparametro9.split(";").slice(0, -1);
            break;
          case 10:
            parts = equipe.nomeparametro10.split(";").slice(0, -1);
            break;
          case 11:
            parts = equipe.nomeparametro11.split(";").slice(0, -1);
            break;
          case 12:
            parts = equipe.nomeparametro12.split(";").slice(0, -1);
            break;
          case 13:
            parts = equipe.nomeparametro13.split(";").slice(0, -1);
            break;
          case 14:
            parts = equipe.nomeparametro14.split(";").slice(0, -1);
            break;
          case 15:
            parts = equipe.nomeparametro15.split(";").slice(0, -1);
            break;
          case 16:
            parts = equipe.nomeparametro16.split(";").slice(0, -1);
            break;
          case 17:
            parts = equipe.nomeparametro17.split(";").slice(0, -1);
            break;
          case 18:
            parts = equipe.nomeparametro18.split(";").slice(0, -1);
            break;
          case 19:
            parts = equipe.nomeparametro19.split(";").slice(0, -1);
            break;
          case 20:
            parts = equipe.nomeparametro20.split(";").slice(0, -1);
            break;
          default:
        }
        
        if (parts[2]!= undefined) {          
          if (parts[3] == 'true') {
            this.Dadosusuario.push({
              nome: parts[0],
              media: media,
              peso: parseInt(parts[1]),
              tipo: 1,
              numero: i
            });
          }
        }
      }

      const IDUsu = localStorage.getItem('ID');
      const IdEvento = localStorage.getItem('notasrecebidas_id');
      const Data = localStorage.getItem('notasrecebidas_dataavaliacao');
      var j = 0;
      
      
      
        const dados = {
          dataHoraEvento: Data,
          idEvento: IdEvento,
          idUsuario: IDUsu
        }

        const Notas = await this.apiService.obterNotasEventoUsuarioEvento(dados);
        var l = 0;
        Notas.forEach((nota) => {

          for(let k = 0; k < this.Dadosusuario.length; k++)
          {
            const param = this.Dadosusuario[k].numero;
            var avaliacao = 0;

            switch (param) {
              case 1:
                avaliacao = nota.notaparam1;
                break;
              case 2:
                avaliacao = nota.notaparam2;
                break;
              case 3:
                avaliacao = nota.notaparam3;
                break;
              case 4:
                avaliacao = nota.notaparam4;
                break;
              case 5:
                avaliacao = nota.notaparam5;
                break;
              case 6:
                avaliacao = nota.notaparam6;
                break;
              case 7:
                avaliacao = nota.notaparam7;
                break;
              case 8:
                avaliacao = nota.notaparam8;
                break;
              case 9:
                avaliacao = nota.notaparam9;
                break;
              case 10:
                avaliacao = nota.notaparam10;
                break;
              case 11:
                avaliacao = nota.notaparam11;
                break;
              case 12:
                avaliacao = nota.notaparam12;
                break;
              case 13:
                avaliacao = nota.notaparam13;
                break;
              case 14:
                avaliacao = nota.notaparam14;
                break;
              case 15:
                avaliacao = nota.notaparam15;
                break;
              case 16:
                avaliacao = nota.notaparam16;
                break;
              case 17:
                avaliacao = nota.notaparam17;
                break;
              case 18:
                avaliacao = nota.notaparam18;
                break;
              case 19:
                avaliacao = nota.notaparam19;
                break;
              case 20:
                avaliacao = nota.notaparam20;
                break;
              default:
            }
            this.Dadosusuario[k].media += avaliacao * this.Dadosusuario[k].tipo;
            this.Dadosusuario[k].media = parseFloat(this.Dadosusuario[k].media.toFixed(2));
          }                
          j++;
        });
      
      var peso = 0;
      for (let i = 0; i < this.Dadosusuario.length; i++) {
        this.Dadosusuario[i].media = this.Dadosusuario[i].media / j;
        this.media += this.Dadosusuario[i].media * this.Dadosusuario[i].peso;
        peso += this.Dadosusuario[i].peso;
      }
      this.media = this.media / peso;
      this.media = parseFloat(this.media.toFixed(2));



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

  Voltar() {
    this.router.navigate(['/avaliacaorecebida']);
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
