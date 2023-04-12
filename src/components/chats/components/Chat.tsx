import {FC} from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Chat.module.scss';
import { type Message } from '@/components/messages/components/MessageEl';
import Avatar from '@/components/ui/Avatar';
import Info from './components/Info';

export interface Chat {
  id: number;
  title: string;
  lastMessage: Message;
}

interface ChatProps {
  chat: Chat;
}

const Chats: FC<ChatProps> = ({chat}) => {
  const { query } = useRouter();
  const {title, id} = chat;
  const active = Number(query.id) === id;

  return <Link href={`/${id}`} className={`${styles.layout} ${ active ? styles.active : '' }`}>
    <div className={styles.avatar}>
      <Avatar title={chat.title} active={active} />
    </div>
    <div className={styles.info}>
      <Info title={title} text={chat.lastMessage.content} active={active}/>
    </div>
  </Link>
};

export default Chats;