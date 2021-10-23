import { useEffect } from 'react';

import styles from './styles.module.scss';

import { api } from '../../services/api';

import { VscGithubInverted } from 'react-icons/vsc';

const { VITE_GITHUB_CLIENT_ID } = import.meta.env;

type UserDataAndToken = {
  token: string;
  user: {
    id: string;
    name: string;
    github_id: number;
    avatar_url: string;
    login: string;
  };
};

export function LoginBox() {
  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}`;

  async function signIn(githubCode: string) {
    const response = await api.post<UserDataAndToken>('/authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);
  }

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
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={githubOAuthUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size='24' />
        Entrar com github
      </a>
    </div>
  );
}
