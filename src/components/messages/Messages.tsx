import {FC, HTMLAttributes} from 'react';
import styles from './Messages.module.scss';

export interface Message {
  id: number;
  content: string;  
  sender: number;
  unixtime: number;
}

interface MessagesProps extends HTMLAttributes<HTMLDivElement> {}

const Chats: FC<MessagesProps> = (props) => {
  return <div {...props} className={styles.layout}>
    Messages
  </div>
};

export default Chats;