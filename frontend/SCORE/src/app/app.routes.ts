import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';  
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastropessoa', component: CadastroPessoaComponent },
  { path: 'Esqueci', component:  EsqueciSenhaComponent},
  { path: 'inicio', component:  TelaInicialComponent},
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
