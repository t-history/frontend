import {FC} from 'react';
import styles from './MessageEl.module.scss';

export interface Message {
  id: number;
  content: string;  
  sender: number;
  unixtime: number;
}

interface MessageElProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageEl: FC<MessageElProps> = ({message, isOwnMessage}) => {
  return <div className={styles.container}>
    <div
      key={message.id}
      className={`${styles.message} ${ isOwnMessage ? styles.mymessage : ''}`}
    >
      {message.content}
    </div>
  </div>
};

export default MessageEl;