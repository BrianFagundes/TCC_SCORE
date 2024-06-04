import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Importa o HttpClientModule aqui também
    AppRoutingModule
  ],
  providers: []
})
export class AppModule { }
