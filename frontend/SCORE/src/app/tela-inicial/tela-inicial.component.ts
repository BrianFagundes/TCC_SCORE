import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {
  imagePath: string = '';
  
  nomeUsuario: string = ''; // Variável para armazenar o nome do usuário
  IdUsuario: string = ''; // Variável para armazenar o email do usuário

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
  

  usuario()
  {
    this.router.navigate(['/usuario']);
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

  CriarEquipe(){
    this.router.navigate(['/criarequipes']);
  }
  
  CriarEvento(){
    this.router.navigate(['/criarevento']);
  }
}
