import axios from 'axios';
import { FC } from 'react';
import { VscSync } from 'react-icons/vsc';

import Avatar from '@/components/ui/Avatar';
import { type IChat } from '@/interfaces/Chat';

import styles from './Header.module.scss';


interface HeaderProps {
  chat?: IChat;
}

const Header: FC<HeaderProps> = ({ chat }) => {
  if (!chat) {
    return <div className={styles.layout}>No chat</div>
  }
  const isChatIdle = chat.status === 'idle';

  const handleSync = () => {
    if (!isChatIdle) return;
    axios.post(`/api/queue/chat/${chat.id}/sync`)
  };


  return <div className={styles.layout}>
    <Avatar title={chat.title} status={chat.status} />
    {chat && chat.title}
    <div className={styles.actions}>
      <button
        className={`
          ${styles.actions__item}
          ${!isChatIdle && styles.actions__item__disabled}
          
        `}
        onClick={handleSync}
      >
        <VscSync className={`${!isChatIdle && styles.actions__item__spin}`} />
      </button>
    </div>
  </div>
};

export default Header;