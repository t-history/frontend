import { FC } from 'react';

import { IChat } from '@/interfaces/Chat';
import { useAppContext } from '@/providers/Context';

import styles from './Info.module.scss';

interface InfoProps {
  chat: IChat;
}

const Info: FC<InfoProps> = ({ chat }) => {
  const { state } = useAppContext();
  const { title, id, lastMessage } = chat;

  const activeClass = id === state.id ? styles.active : '';
  const isText = lastMessage.type === 'messageText';

  return <div className={styles.layout}>
      <div className={`${styles.title} ${activeClass}`}>
        {title}
      </div>
      <div className={`${styles.text} ${activeClass}`}>
        {isText && lastMessage.content}
        {!isText && <span className={styles.type}>{lastMessage.type}</span>}
      </div>
  </div>
}

export default Info;