import {FC} from 'react';
import styles from './Info.module.scss';

interface InfoProps {
  title: string;
  text: string;
  active?: boolean;
}

const Info: FC<InfoProps> = ({title, text, active}) => {
  const activeClass = active ? styles.active : '';

  return <div className={styles.layout}>
      <div className={`${styles.title} ${activeClass}`}>
        {title}
      </div>
      <div className={`${styles.text} ${activeClass}`}>
        {text}
      </div>
  </div>
}

export default Info;