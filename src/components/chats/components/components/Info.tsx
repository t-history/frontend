import {FC} from 'react';
import styles from './Info.module.scss';

interface InfoProps {
  title: string;
  text: string;
  active?: boolean;
}

const Info: FC<InfoProps> = ({title, text, active}) => {
  return <div className={styles.layout}>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.text} ${active ? styles.active : ''}`}>{text}</div>
  </div>
}

export default Info;