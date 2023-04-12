import {FC} from 'react';
import styles from './Info.module.scss';

interface InfoProps {
  title: string;
  text: string;
  active?: boolean;
}

const Info: FC<InfoProps> = ({title, text, active}) => {
  const color = active ? '#fff' : '';

  return <div className={styles.layout}>
      <div className={styles.title} style={{color}}>{title}</div>
      <div className={styles.text} style={{color}}>{text}</div>
  </div>
}

export default Info;