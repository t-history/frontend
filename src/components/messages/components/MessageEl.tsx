import {FC, forwardRef} from 'react';
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

const MessageEl = forwardRef<HTMLDivElement, MessageElProps>(({message, isOwnMessage}, ref) => {
  return <div className={styles.container}  ref={ref}>
    <div
      key={message.id}
      className={`${styles.message} ${ isOwnMessage ? styles.mymessage : ''}`}
    >
      {message.content}
    </div>
  </div>
});

MessageEl.displayName = 'MessageEl';
export default MessageEl;