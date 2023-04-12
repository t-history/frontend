import {FC} from 'react';
import styles from './Info.module.scss';

interface InfoProps {
  title: string;
  text: string;
}

const Info: FC<InfoProps> = ({title, text}) => {
  return <div className={styles.layout}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
  </div>
}

export default Info;