import {FC} from 'react';
import Link from 'next/link'
import styles from './ChatItem.module.scss';
import { type Message } from '@/components/messages/components/MessageEl';
import Avatar from '@/components/ui/Avatar';
import Info from './components/Info';
import { useAppContext } from '@/providers/Context';

export interface IChat {
  id: number;
  title: string;
  lastMessage: Message;
}

interface ChatProps {
  chat: IChat;
}

const ChatItem: FC<ChatProps> = ({chat}) => {
  const { state, setState } = useAppContext();

  const {title, id} = chat;
  const active = state.id === id;

  return <Link onClick={() => setState({id})} href={`/#${id}`} className={`${styles.layout} ${ active ? styles.active : '' }`}>
    <div className={styles.avatar}>
      <Avatar title={chat.title} active={active} />
    </div>
    <div className={styles.info}>
      <Info title={title} text={chat.lastMessage.content} active={active}/>
    </div>
  </Link>
};

export default ChatItem;