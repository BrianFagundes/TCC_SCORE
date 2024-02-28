// api.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Substitua pela URL da sua API

  constructor() {}

  async enviarEmailRecuperacao(email: string): Promise<number> {
    const url = `${this.apiUrl}/enviar-email`;
    const emailData = {
      to: email,
      subject: "Recuperação de senha",
      body: "A senha de seu usuário é: "
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {
        //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
        return 2; // Falha ao enviar e-mail
      }
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      return 2; // Erro durante a chamada à API
    }
  }

  async cadastrarUsuario(dadosUsuario: any) {
    const url = `${this.apiUrl}/usuarios`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosUsuario),
        });   
        if (response.ok) {        
          const responseData = await response.json();
          return responseData; // O código de sucesso retornado pela API
        } else {
          //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
          return 2; // Falha ao enviar e-mail
        }
      } catch (error) {
        console.error('Erro ao enviar e-mail de recuperação:', error);
        return 2; // Erro durante a chamada à API
      }
    
  }  
  
  async cadastrarUsuario2(dadosUsuario: any) {
    const url = `${this.apiUrl}/usuarios/Automatico`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosUsuario),
        });   
        if (response.ok) {        
          const responseData = await response.json();
          return responseData; // O código de sucesso retornado pela API
        } else {
          //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
          return 2; // Falha ao enviar e-mail
        }
      } catch (error) {
        console.error('Erro ao enviar e-mail de recuperação:', error);
        return 2; // Erro durante a chamada à API
      }
    
  } 

  validarUsuario(email: string, senha: string): Promise<number> {
    const url = `${this.apiUrl}/usuarios/${email}/${senha}`;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao validar usuário');
        }
      })
      .then(data => {
        // Se a resposta da API for verdadeira, o usuário é válido
        return data;
      })
      .catch(error => {
        console.error('Erro ao validar usuário:', error);
        return 0;
      });
  }

  LevantaNomeUsuario(id: string): Promise<string> {
    const url = `${this.apiUrl}/usuarios/Nome/Levanta/${id}`;

    return fetch(url)
      .then(response => {
        if (response.ok) {          
          return response.text(); // Se a resposta estiver OK, retorna o texto diretamente
        } else {
          throw new Error('Erro ao validar usuário');
        }
      })
      .then(data => {
        // Se a resposta estiver OK, retorna o texto (nome do usuário)
        return data.trim(); // Remove espaços em branco do início e do final do texto
      })
      .catch(error => {
        console.error('Erro ao validar usuário:', error);
        return ''; // Retorna uma string vazia em caso de erro
      });
  }

  
}
