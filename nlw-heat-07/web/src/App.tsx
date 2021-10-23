// Named exports = maior facilidade
// export const App = () => <h1>Hello World</h1>;

import styles from './App.module.scss';

import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  );
}
