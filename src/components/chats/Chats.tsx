import { useVirtualizer } from '@tanstack/react-virtual';
import React, { FC } from 'react';

import { IChat } from '@/interfaces/Chat'
import { useAppContext } from '@/providers/AppContext'

import styles from './Chats.module.scss';
import ChatItem from './components/ChatItem';

interface ChatsProps {
  chats: IChat[];
}

const ChatList: FC<ChatsProps> = ({ chats }) => {
  const { showOnlySynchronizableChats } = useAppContext()

  const visibleChats = showOnlySynchronizableChats ? chats.filter(chat => chat.isSynchronizable) : chats
  const parentRef = React.useRef<HTMLDivElement>(null);

  const itemSize = 72;

  const virtualizer = useVirtualizer({
    count: visibleChats.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan: 5,
  })

  const items = virtualizer.getVirtualItems()

  return <div
        ref={parentRef}
        className={styles.layout}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            minHeight: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {items.map((virtualItem: any) => (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ChatItem chat={visibleChats[virtualItem.index]} />
            </div>
          ))}
        </div>
        {
          !visibleChats.length &&
            <div className={styles.empty}>
              No chats found
            </div>
        }
  </div>
};

export default ChatList;