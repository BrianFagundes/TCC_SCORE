

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
  
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
