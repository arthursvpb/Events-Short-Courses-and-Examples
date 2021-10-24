import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/auth';

import { api } from '../../services/api';

import styles from './styles.module.scss';

import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) return;

    api.post('/messages', { message });

    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size='32' />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size='16' />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          id='message'
          name='message'
          value={message}
          placeholder='Qual sua expectativa para o evento?'
          onChange={event => setMessage(event.target.value)}
        />

        <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  );
}
