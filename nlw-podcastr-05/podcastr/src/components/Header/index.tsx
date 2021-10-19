import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

// CSS Module: styles.module.scss -> create style for specific component
// This module never share its styling with other components
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src='/logo.svg' alt='Podcastr' />

      <p>Lorem ipsum dolor sit amet consectetur.</p>

      <span>{currentDate}</span>
    </header>
  );
}
