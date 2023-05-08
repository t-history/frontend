import { forwardRef } from 'react';

import { IMessage } from '@/interfaces/Message';

import styles from './Message.module.scss';

interface MessageProps {
  message: IMessage;
  isOwnMessage: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(({ message, isOwnMessage }, ref) => {
  const isText = message.type === 'messageText';
  const date = new Date(message.unixtime * 1000);

  return <div className={styles.container}  ref={ref}>
    <div
      key={message.id}
      className={`
        ${ styles.message }
        ${ isOwnMessage ? styles.mymessage : ''}
        ${ message.removed ? styles['message--removed'] : ''}
      `}
      title={`${date.toLocaleString()} ${message.removed ? 'removed' : ''}`}
    >
      {isText && message.content}
      {!isText && message.type}
    </div>
  </div>
});

Message.displayName = 'Message';
export default Message;