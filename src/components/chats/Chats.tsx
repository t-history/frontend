import {FC} from 'react';
import ChatItem from './components/ChatItem';
import { TChat } from './components/ChatItem'
import styles from './Chats.module.scss';

import dynamic from 'next/dynamic';
import { FixedSizeList as List } from 'react-window';

const NoSSRList = dynamic(() => Promise.resolve(List), { ssr: false });

interface ChatsProps {
  chats: TChat[];
}

type ListItemProps = {
  index?: number;
  style?: React.CSSProperties;
};

const ChatList: FC<ChatsProps> = ({chats}) => {
  const ListComponent = typeof window === 'undefined' ? List : NoSSRList;
  const preRenderCount = 100;
  const itemSize = 72;

  const ListItem: React.FC<ListItemProps> = ({ index = 0, style }) => {
    const chat = chats[index + preRenderCount];
    return <div style={style}>
        <ChatItem chat={chat} key={index + preRenderCount} />;
    </div>
  };

  return <div className={styles.layout}>
    {Array.from({ length: preRenderCount }).map((_, i) => (
      <ListItem />
    ))}
    <ListComponent
      height={chats.length * itemSize}
      itemCount={chats.length - preRenderCount}
      itemSize={itemSize}
      width='100%'
      initialScrollOffset={preRenderCount * itemSize}
    >
      <ListItem />
    </ListComponent>
  </div>
};

export default ChatList;