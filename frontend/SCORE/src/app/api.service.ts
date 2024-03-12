// api.service.ts

import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  identificador: string;
  foto: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private apiUrl = 'http://localhost:8080'; // Substitua pela URL da sua API

  constructor() { }

  async autenticarUsuario(): Promise<void> {
    
    const username = "f6546317";
    const password = "f9e29a8";
    
    const url = `${this.apiUrl}/api/authenticate`;
    
    const userData = {
      username, // substitua conforme a chave esperada pelo seu backend
      password, // substitua conforme a chave esperada pelo seu backend
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('jwtToken', token); // Armazenar o token no localStorage     
        console.log('Autenticação realizada com sucesso.');   
      } else {
        console.log('Falha na autenticação. Verifique o usuário e a senha.');
      }
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error);
      console.log('Erro ao tentar autenticar.');
    }
  }
  

  async enviarEmailRecuperacao(email: string): Promise<number> {
    const url = `${this.apiUrl}/Email/enviar-email`;
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
    const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
    const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosUsuario),
        });   
        if (response.ok) {        
          const responseData = await response.json();
          return responseData; // O código de sucesso retornado pela API
        } else {
          //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
          return -1;
        }
      } catch (error) {
        console.error('Erro ao enviar e-mail de recuperação:', error);
        return -1; // Erro durante a chamada à API
      }
    
  } 

  async validarUsuario(email: string, senha: string): Promise<number> {    
    const url = `${this.apiUrl}/usuarios/Validacao`;    
    const token = localStorage.getItem('jwtToken'); // Recupera o token do localStorage    
    
    const dadosUsuario = {
      nome: "",
      email: email, 
      senha: senha,
      identificador: "",
      foto: ""
    };


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosUsuario),
        });

        if (response.ok) {
            const data = await response.json();
            // Processa a resposta conforme necessário
            return data; // Exemplo: retorna 1 se a validação for bem-sucedida
        } else {
            console.error('Falha na validação do usuário:', await response.text());
            return 0; // Exemplo: retorna 0 se a validação falhar
        }
    } catch (error) {
        console.error('Erro ao validar usuário:', error);
        return 0; // Indica erro na tentativa de validação
    }
}


  async obterUsuarioPorId(id: string): Promise<Usuario> {
    const url = `${this.apiUrl}/usuarios/${id}`;    
    const token = localStorage.getItem('jwtToken'); // Recupera o token do localStorage    
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Adiciona o token JWT ao cabeçalho Authorization
            },
        });

        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Erro ao obter usuário');
        }

    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        throw error;
    }

  }    

  atualizarUsuario(id: string, pNome: string, pEmail: string, pFoto : string, pSenha : string): Promise<Usuario> {
    const token = localStorage.getItem('jwtToken');

    const dadosUsuario = {
      nome: pNome,
      email: pEmail, 
      senha: pSenha,
      identificador: "",
      foto: pFoto
    };


    const url = `${this.apiUrl}/usuarios/${id}`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dadosUsuario),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // Se a resposta não estiver ok, lança um erro que pode ser pego pelo .catch()
        throw new Error('Erro ao atualizar usuário');
      }
    })
    .then(usuarioAtualizado => {
      return usuarioAtualizado as Usuario;
    })
    .catch(error => {
      console.error('Erro ao atualizar usuário:', error);
      // Pode optar por retornar um valor padrão ou propagar o erro
      throw error;
    });
  }

  deletarUsuario(id: string): Promise<void> {
    const token = localStorage.getItem('jwtToken');
    
    const url = `${this.apiUrl}/usuarios/${id}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        // Se a resposta não estiver ok, lança um erro que pode ser pego pelo .catch()
        throw new Error('Erro ao deletar usuário');
      }
    })
    .catch(error => {
      console.error('Erro ao deletar usuário:', error);
      // Pode optar por retornar um valor padrão ou propagar o erro
      throw error;
    });
  }
  
}


