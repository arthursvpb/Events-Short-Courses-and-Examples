import { useState, useEffect } from 'react';

import styles from './styles.module.scss';

import logo from '../../assets/logo.svg';

import { api } from '../../services/api';

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
    login: string;
  };
}

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function fetchMessageList() {
    const { data: fetchedMessages } = await api.get<Message[]>(
      '/messages/last3'
    );

    setMessages(fetchedMessages);
  }

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <div className={styles.messsageListWrapper}>
      <img src={logo} alt='Do While 2021' />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.login}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
