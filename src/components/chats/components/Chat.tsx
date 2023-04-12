import {FC} from 'react';
import Link from 'next/link'
import styles from './Chat.module.scss';
import { Message } from '@/components/messages/Messages';
import Avatar from './components/Avatar';
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
  // name abbreviation for chat title (e.g. "Telegram chat with Artem" => "TA")
  const createAbbreviation = (str: string) => {
    const words = str.split(' ');
        
    if (words.length === 0) {
      return 'No name';
    }
    
    const firstLetter = str.charAt(0).toUpperCase();
    if (words.length === 1) {
      return firstLetter
    }

    const lastLetter = words[words.length - 1].charAt(0).toUpperCase();
    
    return `${firstLetter}${lastLetter}`;
  }

  const {title, id} = chat;
  // name abbreviation for chat title (e.g. "Telegram chat with Artem" => "TA")
  const nameAbbreviation = createAbbreviation(title);
  return <Link href={`/messages/${id}`} className={styles.layout}>
    <div className={styles.avatar}>
      <Avatar abbr={nameAbbreviation} />
    </div>
    <div className={styles.info}>
      <Info title={title} text={chat.lastMessage.content} />
      {/* <span className={styles.title}>{title}</span> */}
    </div>
  </Link>
};

export default Chats;