

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';  
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CriarequipeComponent } from './criarequipe/criarequipe.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CriareventoComponent } from './criarevento/criarevento.component';
import { DetalheeventoComponent } from './detalheevento/detalheevento.component';
import { EquipesComponent } from './equipes/equipes.component';
import { UsuarioequipeComponent } from './usuarioequipe/usuarioequipe.component';
import { AvaliacoespendentesComponent } from './avaliacoespendentes/avaliacoespendentes.component';
import { AvaliacaoparticipantesComponent } from './avaliacaoparticipantes/avaliacaoparticipantes.component';
import { NotasrecebidasComponent } from './notasrecebidas/notasrecebidas.component';
import { NotausuarioeventoComponent } from './notausuarioevento/notausuarioevento.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { SaibamaisComponent } from './saibamais/saibamais.component';
import { TermosComponent } from './termos/termos.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cadastropessoa', component: CadastroPessoaComponent  },
  { path: 'Esqueci', component:  EsqueciSenhaComponent},
  { path: 'inicio', component:  TelaInicialComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component:  UsuarioComponent, canActivate: [AuthGuard] },  
  { path: 'criarequipes', component:  CriarequipeComponent, canActivate: [AuthGuard] },  
  { path: 'detalhes', component:  DetalhesComponent, canActivate: [AuthGuard] },  
  { path: 'criarevento', component:  CriareventoComponent, canActivate: [AuthGuard] },
  { path: 'detalheevento', component:  DetalheeventoComponent, canActivate: [AuthGuard] },
  { path: 'equipes', component:  EquipesComponent, canActivate: [AuthGuard] },
  { path: 'usuarioequipe', component:  UsuarioequipeComponent, canActivate: [AuthGuard] },
  { path: 'avaliacoespendentes', component:  AvaliacoespendentesComponent, canActivate: [AuthGuard] },
  { path: 'avaliacaoparticipantes', component:  AvaliacaoparticipantesComponent, canActivate: [AuthGuard] },
  { path: 'avaliacaorecebida', component:  NotasrecebidasComponent, canActivate: [AuthGuard] },
  { path: 'avaliacaorecebidanotas', component:  NotausuarioeventoComponent, canActivate: [AuthGuard] },    
  { path: 'politicas', component:  PoliticasComponent },
  { path: 'saibamais', component:  SaibamaisComponent },
  { path: 'termos', component:  TermosComponent },
  
  
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
