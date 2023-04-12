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
}

const MessageEl: FC<MessageElProps> = ({message}) => {
  const randomTrueFalse = Math.random() >= 0.5;

  return <div className={styles.container}>
    <div
        key={message.id}
        className={styles.message}
        style={{
          marginLeft: randomTrueFalse
            ? '' 
            : 'auto',
          backgroundColor: randomTrueFalse
            ? ''
            : 'var(--color-primary)',
        }}>
      {message.content}
    </div>
  </div>
};

export default MessageEl;