import {FC} from 'react';
import Link from 'next/link'
import styles from './ChatItem.module.scss';
import Avatar from '@/components/ui/Avatar';
import Info from './components/Info';
import { useAppContext } from '@/providers/Context';
import { IChat } from '@/interfaces/Chat';

interface ChatProps {
  chat: IChat;
}

const ChatItem: FC<ChatProps> = ({chat}) => {
  const { state, setState } = useAppContext();

  const {id} = chat;
  const active = state.id === id;

  return <Link onClick={() => setState({id})} href={`/#${id}`} className={`${styles.layout} ${ active ? styles.active : '' }`}>
    <div className={styles.avatar}>
      <Avatar title={chat.title} active={active} />
    </div>
    <div className={styles.info}>
      <Info chat={chat}/>
    </div>
  </Link>
};

export default ChatItem;