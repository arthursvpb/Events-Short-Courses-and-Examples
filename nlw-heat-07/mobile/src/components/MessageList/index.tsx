import React from 'react';

import { ScrollView } from 'react-native';
import { Message, MessageProps } from '../Message';

import { styles } from './styles';

export function MessageList() {
  const message: MessageProps = {
    id: '1',
    text: 'Lorem ipsum',
    user: {
      name: 'Arthur',
      avatar_url: 'https://github.com/arthursvpb.png',
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
    >
      <Message data={message} />
      <Message data={message} />
      <Message data={message} />
    </ScrollView>
  );
}
