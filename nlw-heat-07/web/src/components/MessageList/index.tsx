import styles from './styles.module.scss';

import logo from '../../assets/logo.svg';

export function MessageList() {
  return (
    <div className={styles.messsageListWrapper}>
      <img src={logo} alt='Do While 2021' />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            nam consequuntur adipisci assumenda nesciunt asperiores, quae ut in
            at sit.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src='https://github.com/arthursvpb.png'
                alt='Arthur Vasconcellos'
              />
            </div>
            <span>Arthur Vasconcellos</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            nam consequuntur adipisci assumenda nesciunt asperiores, quae ut in
            at sit.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src='https://github.com/arthursvpb.png'
                alt='Arthur Vasconcellos'
              />
            </div>
            <span>Arthur Vasconcellos</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            nam consequuntur adipisci assumenda nesciunt asperiores, quae ut in
            at sit.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src='https://github.com/arthursvpb.png'
                alt='Arthur Vasconcellos'
              />
            </div>
            <span>Arthur Vasconcellos</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
