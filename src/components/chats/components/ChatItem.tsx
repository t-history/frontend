import Link from 'next/link'
import { FC } from 'react';

import Avatar from '@/components/ui/Avatar';
import { IChat } from '@/interfaces/Chat';
import { useAppContext } from '@/providers/AppContext';

import styles from './ChatItem.module.scss';
import Info from './components/Info';


interface ChatProps {
  chat: IChat;
}

const ChatItem: FC<ChatProps> = ({ chat }) => {
  const { state, setState } = useAppContext();

  const { id } = chat;
  const active = state.id === chat.id;

  const activeClass = active ? styles.active : ''
  const synchronizableClass = chat.isSynchronizable ? '' : styles['not-synchronizable']

  return <Link
    onClick={() => setState({ id })}
    href={`/#${id}`}
    className={`${styles.layout} ${ activeClass } ${ synchronizableClass }`
  }>
    <div className={styles.avatar}>
      <Avatar title={chat.title} active={active} status={chat.status} />
    </div>
    <div className={styles.info}>
      <Info chat={chat}/>
    </div>
  </Link>
};

export default ChatItem;