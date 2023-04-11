import {FC, HTMLAttributes} from 'react';
import styles from './Chat.module.scss';

interface ChatProps {
  title: string;
  message?: string;
}

const Chats: FC<ChatProps> = ({title}) => {
  return <div className={styles.layout}>
    {title}
  </div>
};

export default Chats;