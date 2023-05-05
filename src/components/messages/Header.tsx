import axios from 'axios';
import { FC } from 'react';
import { VscSync } from 'react-icons/vsc';

import Action from '@/components/ui/Action';
import Avatar from '@/components/ui/Avatar';
import { type IChat } from '@/interfaces/Chat';
import { useAppContext } from '@/providers/AppContext';

import styles from './Header.module.scss';

interface HeaderProps {
  chat?: IChat;
}

const Header: FC<HeaderProps> = ({ chat }) => {
  const { updateChat } = useAppContext();

  if (!chat) {
    return <div className={styles.layout}>No chat</div>
  }
  const isChatIdle = chat.status === 'idle';

  const handleSync = () => {
    if (!isChatIdle) return;
    updateChat({
      ...chat,
      status: 'queued'
    })
    axios.post(`/api/queue/chat/${chat.id}/sync`)
  };

  return <div className={styles.layout}>
    <Avatar title={chat.title} status={chat.status} />
    {chat && chat.title}
    <div className={styles.actions}>
      {chat.isSynchronizable &&
        <Action onClick={handleSync} disabled={!isChatIdle}>
          <VscSync className={`${!isChatIdle && styles['actions__item--spin']}`} title="Synchronize chat"/>
        </Action>
      }
    </div>
  </div>
};

export default Header;