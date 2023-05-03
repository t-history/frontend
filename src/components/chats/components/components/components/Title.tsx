import { FC } from 'react';

import styles from './Title.module.scss';

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return <div className={styles.layout}>
    {title}
  </div>
};

export default Title;