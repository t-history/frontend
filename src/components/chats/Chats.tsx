import {FC} from 'react';
import Chat from './components/Chat';
import { TChat } from './components/Chat'
import styles from './Chats.module.scss';

interface ChatsProps {
  chats: TChat[];
}

const Chats: FC<ChatsProps> = ({chats}) => {
  return <div className={styles.layout}>
    {chats.map((chat, i) =>
      <Chat chat={chat} key={i}/>
    )}
  </div>
};

export default Chats;