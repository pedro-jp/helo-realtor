import React from 'react';
import styles from './styles.module.scss';

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className={styles.header}>
      <h1>{children}</h1>
    </header>
  );
};
