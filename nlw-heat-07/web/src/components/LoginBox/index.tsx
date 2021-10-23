import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import styles from './styles.module.scss';

import { VscGithubInverted } from 'react-icons/vsc';

export function LoginBox() {
  // Recuperamos o contexto com o useContext
  const { githubOAuthUrl } = useContext(AuthContext);

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
