// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';
//import { Observable } from 'rxjs';


interface NotaId {
  dataHoraEvento: string;
  idEvento: number;
  idUsuarioOrigem: number;
  idUsuarioDestino: number;
}

interface Nota {
  notaId: NotaId;
  notaparam1: number;
  notaparam2: number;
  notaparam3: number;
  notaparam4: number;
  notaparam5: number;
  notaparam6: number;
  notaparam7: number;
  notaparam8: number;
  notaparam9: number;
  notaparam10: number;
  notaparam11: number;
  notaparam12: number;
  notaparam13: number;
  notaparam14: number;
  notaparam15: number;
  notaparam16: number;
  notaparam17: number;
  notaparam18: number;
  notaparam19: number;
  notaparam20: number;
  avaliado: string;
}



interface Custo {
  evento: number;
  usuario: number;
  custo: boolean;
} 

interface Time {
  evento: number;
  numerotime: number;
  usuario: number;
}


interface Modelo {
  esporte: string;
  parametro: string;
  peso: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  identificador: string;
  foto: string;
}

interface Equipe {
  id: number;
  nome: string;
  foto: string;
  sigla: string;
  informacoes: string;
  nomeparametro1: string;
  nomeparametro2: string;
  nomeparametro3: string;
  nomeparametro4: string;
  nomeparametro5: string;
  nomeparametro6: string;
  nomeparametro7: string;
  nomeparametro8: string;
  nomeparametro9: string;
  nomeparametro10: string;
  nomeparametro11: string;
  nomeparametro12: string;
  nomeparametro13: string;
  nomeparametro14: string;
  nomeparametro15: string;
  nomeparametro16: string;
  nomeparametro17: string;
  nomeparametro18: string;
  nomeparametro19: string;
  nomeparametro20: string;
  moderador: number;
  statuseventos: string;
}

interface Participante {
  equipe: string;
  usuario: string;
  moderador: boolean;
}

interface Evento{
  id: number,
  equipe: number,
  nome: string,
  local: string,
  peridiocidade: string,
  dia: string,
  hora: string,
  quantidade_time: number,
  status: string,
  dataultimoevento: string,
  chavepix: string,
  duracao: string
}


    
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private apiUrl = 'https://app.tccscore.com'; // Substitua pela URL da sua API

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router,private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  async renewToken(): Promise<string> {
    
    const token = this.getToken();
    
    if (!token) {
      throw new Error('Token não encontrado');
    }

    try {
      const response = await this.http.post<{ token: string }>(`${this.apiUrl}/api/renew-token`, {}, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      }).toPromise();
      
      if (response && response.token) {
        this.setToken(response.token);
        return response.token;
      } else {
        throw new Error('Resposta inválida ao renovar o token');
      }
    } catch (error) {
      //alert('Erro ao renovar o token'+ error)
      console.error('Erro ao renovar o token', error);
      throw error;
    }
  }

  async ensureValidToken(): Promise<void> {
    const token = this.getToken();
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      const now = new Date().getTime();
      const expirationTime = expirationDate?.getTime() || 0;
      const timeLeft = expirationTime - now;

      if (timeLeft <= 0) {
        localStorage.setItem('sessaoexpirada', 'true');
        localStorage.setItem('jwtToken', '');
        this.router.navigate(['/']);
        return;
      }

      const issuedAt = this.jwtHelper.decodeToken(token).iat * 1000;
      const totalTime = expirationTime - issuedAt;
      const tenPercentOfTime = totalTime * 0.1;

      if (timeLeft <= tenPercentOfTime) {
        await this.renewToken();
      }
    }
  }

  async autenticarUsuario(username2: String, password2: String): Promise<void> {
    const username = "f6546317";
    const password = "f9e29a8";

    username2 = username2 == "" || username2 == null ? "a1B2c3D4e5F6g7H8i9J" : username2;
    password2 = password2 == "" || password2 == null ? "k1L2m3N4o5P6q7R8s9T" : password2;


    const url = `${this.apiUrl}/api/authenticate`;
    const userData = {
      username, // substitua conforme a chave esperada pelo seu backend
      password, // substitua conforme a chave esperada pelo seu backend
      username2,
      password2
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

  async enviarEmailRecuperacao2(email: string, codigo: string): Promise<number> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/Email/enviar-email2`;
    const emailData = {
      to: email,
      subject: "Validação de Usuário",
      body: "O código enviado é: " + codigo
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

  enviarEmail(email: string, codigo: string): void {
    
    const url = `${this.apiUrl}/Email/enviar-email`;
    const emailData = {
      to: email,
      subject: "Validação de Usuário",
      body: "O código enviado é: " + codigo
    };
    
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });         
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
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
          //alert('Erro ao cadastrar usuário!');
          //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
          return 2; // Falha ao enviar e-mail
        }
      } catch (error) {
        //alert('Erro ao cadastrar usuário: '+ error);
        return 2; // Erro durante a chamada à API
      }
    
  }  
  
  async cadastrarUsuario2(dadosUsuario: any) {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
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
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
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

  async atualizarUsuario(id: string, pNome: string, pEmail: string, pFoto : string, pSenha : string): Promise<Usuario> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
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

  async deletarUsuario(id: string): Promise<void> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
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

  async CriarEquipe(dadosEquipe: any) {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/usuarios/Equipe/criar`;
    const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosEquipe),
        });   
        if (response.ok) {        
          const responseData = await response.json();
          return responseData; // O código de sucesso retornado pela API
        } else {
          //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
          return -1;
        }
      } catch (error) {
        return -1; // Erro durante a chamada à API
      }
    
  } 

  async CriarEvento(dadosEquipe: any) {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/usuarios/equipe/evento/criar`;
    const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosEquipe),
        });   
        if (response.ok) {        
          const responseData = await response.json();
          return responseData; 
        } else {
           return -1;
        }
      } catch (error) {
        return -1; 
      }
    
  } 

  async obterTodasEquipes(id: string): Promise<Equipe[]> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/usuarios/Equipe/obter/${id}`;    
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
          throw new Error('Erro ao obter listagem de Equipes');
        }

    } catch (error) {
        console.error('Erro ao obter listagem de Equipes:', error);
        throw error;
    }

  }  

  async obterTodasEquipes2(id: string): Promise<Equipe[]> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/usuarios/Equipe/obter2/${id}`;    
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
          throw new Error('Erro ao obter listagem de Equipes');
        }

    } catch (error) {
        console.error('Erro ao obter listagem de Equipes:', error);
        throw error;
    }

  } 

  async obterTodosEventos(id: string): Promise<Evento[]> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const url = `${this.apiUrl}/usuarios/equipe/evento/obter/Evento/Equipe/${id}`;    
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
          throw new Error('Erro ao obter listagem de Equipes');
        }

    } catch (error) {
        console.error('Erro ao obter listagem de Equipes:', error);
        throw error;
    }

  }  

  async deletarEquipe(id: string): Promise<void> {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const token = localStorage.getItem('jwtToken');
    
    const url = `${this.apiUrl}/usuarios/Equipe/deletar/${id}`;

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

  async carregarimagem(id: string, Foto : string) {
    await this.ensureValidToken(); // Verifica e renova o token, se necessário
    const token = localStorage.getItem('jwtToken');
    
    try {
    const url = `${this.apiUrl}/usuarios/Equipe/Carrega/Logo/${id}`;
    const response = await  fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: Foto,
    });   
    if (response.ok) {        
      const responseData = await response.json();
      return responseData; // O código de sucesso retornado pela API
    } else {
      //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
      return -1;
    }
  } catch (error) {
    return -1; // Erro durante a chamada à API
  
  }  
}

async obterUmaEquipes(id: string): Promise<Equipe> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/Equipe/obter/equipe/${id}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

} 

async AlterarEquipe(dadosEquipe: any) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/Equipe/Alterar`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosEquipe),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {
        //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
        return -1;
      }
    } catch (error) {
      return -1; // Erro durante a chamada à API
    }
  
} 
async Levantarmodelos(): Promise<Modelo[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/modelos/levantartodos`;    
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
        throw new Error('Erro ao obter modelo');
      }

  } catch (error) {
      console.error('Erro ao obter modelo:', error);
      throw error;
  }

}  

async LevantarParticipantes(id: string, email: string): Promise<Usuario> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/obter/id/email/${id}/${email}`;    
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

async CriarParticipante(dadosParticipante: any, i :number) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/Equipe/Participantes/criar/${i}`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosParticipante),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {        
        return -1;
      }
    } catch (error) {
      return -1; // Erro durante a chamada à API
    }
  
} 

async deletarParticipanteEquipe(equipe: string, usuario: string): Promise<void> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const token = localStorage.getItem('jwtToken');
  
  const url = `${this.apiUrl}/usuarios/Equipe/Participantes/deletar/${equipe}/${usuario}`;

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
      throw new Error('Erro ao deletar participante');
    }
  })
  .catch(error => {
    console.error('Erro ao deletar participante:', error);
    // Pode optar por retornar um valor padrão ou propagar o erro
    throw error;
  });
} 

async obterTodosParticipantesEquipe(id: string): Promise<Participante[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/Equipe/Participantes/obter/${id}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }  

}  

async obterEquipesPorParticipanteComUmModerador(id: string): Promise<string[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/Equipe/Participantes/obter/Equipes/participantes/${id}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }  

} 

async deletarEvento(id: string): Promise<void> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const token = localStorage.getItem('jwtToken');
  
  const url = `${this.apiUrl}/usuarios/equipe/evento/deletar/${id}`;

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

async obterUmEvento(id: string): Promise<Evento> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/obter/Evento/${id}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

} 

async AlterarEvento(dadosEvento: any) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/Alterar`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosEvento),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {
        //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
        return -1;
      }
    } catch (error) {
      return -1; // Erro durante a chamada à API
    }
  
} 


async AlterarStatusEvento(dadosEvento: any) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/Alterar/Status`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosEvento),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {
        //console.error('Erro ao enviar e-mail de recuperação:', response.statusText);
        return -1;
      }
    } catch (error) {
      return -1; // Erro durante a chamada à API
    }
  
} 

async CriarTime(dadosTime: any, numero: number) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/time/criar/${numero}`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosTime),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; 
      } else {
         return -1;
      }
    } catch (error) {
      return -1; 
    }
  
} 

async obterTodosTimesEvento(id: string): Promise<Time[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/time/obter/times/${id}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }  

}  

async obterTodosPagantesporevento(id: string): Promise<Custo[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/custo/obter/custos/${id}`;    
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
        throw new Error('Erro ao obter listagem de Pagantes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Pagantes:', error);
      throw error;
  }  

} 

async CriarCustoParticipante(dadosParticipante: any, i :number) {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/custo/criar/${i}`;
  const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosParticipante),
      });   
      if (response.ok) {        
        const responseData = await response.json();
        return responseData; // O código de sucesso retornado pela API
      } else {        
        return -1;
      }
    } catch (error) {
      return -1; // Erro durante a chamada à API
    }
  
} 

async obterNotasEventoUsuario(dados: any): Promise<Nota[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/notas/listarPorEventoEUsuario/${dados.idEvento}/${dados.idUsuario}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

}  

async obterNotasEventoUsuarioOrigem(dados: any): Promise<Nota[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/notas/listarPorEventoEUsuarioOrigem/${dados.idEvento}/${dados.idUsuario}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

}  

async obterNotasDataEventoUsuario(dados: any): Promise<Nota[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/notas/listar/${dados.dataHoraEvento}/${dados.idEvento}/${dados.idUsuario}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

}  

async AlterarNota(dados:any): Promise<Usuario> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const token = localStorage.getItem('jwtToken');


  const url = `${this.apiUrl}/usuarios/equipe/evento/notas/atualizar`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dados),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      // Se a resposta não estiver ok, lança um erro que pode ser pego pelo .catch()
      throw new Error('Erro ao atualizar Nota');
    }
  })
  .then(usuarioAtualizado => {
    return usuarioAtualizado as Usuario;
  })
  .catch(error => {
    console.error('Erro ao atualizar Nota:', error);
    // Pode optar por retornar um valor padrão ou propagar o erro
    throw error;
  });
}  


async obterNotasEventoUsuarioEvento(dados: any): Promise<Nota[]> {
  await this.ensureValidToken(); // Verifica e renova o token, se necessário
  const url = `${this.apiUrl}/usuarios/equipe/evento/notas/listar/Destino/${dados.dataHoraEvento}/${dados.idEvento}/${dados.idUsuario}`;    
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
        throw new Error('Erro ao obter listagem de Equipes');
      }

  } catch (error) {
      console.error('Erro ao obter listagem de Equipes:', error);
      throw error;
  }

}

}


