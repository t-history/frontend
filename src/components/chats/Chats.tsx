import {FC, HTMLAttributes} from 'react';
import Chat from './components/Chat';

import styles from './Chats.module.scss';
interface ChatsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const chats = [
  'Chat 1',
  'Chat 2',
  'Chat 3',
  'Chat 4',
  'Chat 4',
  'Chat 4',
  'Chat 4',
  'Chat 4',
];

const Chats: FC<ChatsProps> = (props) => {
  return <div {...props} className={styles.layout}>
    {chats.map((chat, i) => <Chat title={chat} key={i} />)}

    {/* <Chat title="Chat 1" />
    <Chat title="Chat 2" /> */}
  </div>
};

export default Chats;