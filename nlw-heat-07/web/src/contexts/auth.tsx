import { createContext, useEffect, useState, ReactNode } from 'react';

import { api } from '../services/api';
const { VITE_GITHUB_CLIENT_ID } = import.meta.env;

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null; // null se o usuário não estiver autenticado
  githubOAuthUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: User;
};

// Cria-se o contexto com o 'createContext' inicializando como um objeto do tipo AuthContextData
// Exporta-se esse contexto para que seja usado
export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode; // Qualquer coisa aceitável pelo React
};

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    // Definir cabeçalhos defaults para as requisições
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      // Definir cabeçalhos defaults para as requisições
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/profile').then(({ data: user }) => {
        setUser(user);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubcode = url.includes('?code=');

    if (hasGithubcode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    // Todos os componentes dentro desse componente irão ter acesso ao contexto
    <AuthContext.Provider value={{ githubOAuthUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
