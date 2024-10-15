import React from 'react';
import styles from './styles.module.scss';

export const Main = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <main className={styles.main} style={style}>
      {children}
    </main>
  );
};
