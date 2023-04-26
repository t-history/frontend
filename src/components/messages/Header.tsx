import axios from 'axios';
import { FC } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

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

  const handleSync = () => {
    axios.post(`/api/queue/chat/${chat.id}/sync`)
  };

  return <div className={styles.layout}>
    <Avatar title={chat.title} status={chat.status} />
    {chat && chat.title}
    <div className={styles.actions}>
      <button className={styles.actions__item} onClick={handleSync}><FaSyncAlt /></button>
    </div>
  </div>
};

export default Header;