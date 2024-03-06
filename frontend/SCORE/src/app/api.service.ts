// api.service.ts

import { Injectable } from '@angular/core';

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

  obterUsuarioPorId(id: string): Promise<Usuario> {
    const url = `${this.apiUrl}/usuarios/${id}`; 
  
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Erro ao obter usuário');
        }
      })
      .then(data => {        
        return data as Usuario;
      })
      .catch(error => {
        console.error('Erro ao obter usuário:', error);
        throw error; 
      });
  }  

  LevantaImagemUsuario(id: string): Promise<string> {
    const url = `${this.apiUrl}/usuarios/Foto/Levanta/${id}`;

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

  atualizarUsuario(id: string, pNome: string, pEmail: string, pFoto : string, pSenha : string): Promise<Usuario> {

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
    
    const url = `${this.apiUrl}/usuarios/${id}`;

    return fetch(url, {
      method: 'DELETE',
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

  atualizarSenha(id: string, novaSenha: string): Promise<Usuario> {
    const url = `${this.apiUrl}/usuarios/AlterarSenha/${id}`;
    
    const dadosUsuario = {
      nome: "",
      email: "",
      senha: novaSenha,
      identificador: "",
      foto: ""
    };
  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar senha do usuário');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erro ao atualizar senha do usuário:', error);
      throw error;
    });
  }
  
}


