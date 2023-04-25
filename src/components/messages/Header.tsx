import {FC} from 'react';
import styles from './Header.module.scss';
import {type IChat} from '@/interfaces/Chat';
import Avatar from '@/components/ui/Avatar';
import { FaSyncAlt } from 'react-icons/fa';
import axios from 'axios';

interface HeaderProps {
  chat?: IChat;
}

const Header: FC<HeaderProps> = ({chat}) => {
  if (!chat) {
    return <div className={styles.layout}>No chat</div>
  }

  const handleSync = () => {
    axios.post(`/api/queue/chat/${chat.id}/sync`)
  };

  return <div className={styles.layout}>
    <Avatar title={chat.title} />
    {chat && chat.title}
    <div className={styles.actions}>
      <button className={styles.actions__item} onClick={handleSync}><FaSyncAlt /></button>
    </div>
  </div>
};

export default Header;