import { useState, useEffect } from 'react';

import io from 'socket.io-client';

import styles from './styles.module.scss';

import logo from '../../assets/logo.svg';

import { api } from '../../services/api';

const socket = io('http://localhost:4000');

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
    login: string;
  };
}

const messagesQueue: Message[] = [];

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        // Posso capturas estados anteriores passando uma função com o parâmetro previousState
        setMessages(
          previousState =>
            [messagesQueue[0], previousState[0], previousState[1]].filter(
              Boolean
            ) // Filter boolean remove valores que são falsy
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

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
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
