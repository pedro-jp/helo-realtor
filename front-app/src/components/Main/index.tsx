import React from 'react';
import styles from './styles.module.scss';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
};
