import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { IMessage } from '@/interfaces/Message';
import { useAppContext } from '@/providers/AppContext';

import Message from './components/Message';
import styles from './Messages.module.scss';


const Messages: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>(null);
  const [isEmptyMessages, setEmptyMessages] = useState<boolean>(false);

  const { state } = useAppContext();
  const { id } = state

  const fetchMessageChunk = async () => {
    console.log('fetchMessageChunk');
    try {
      const oldesMessageId = messages.length > 0 ? messages[0].id : 0;

      const response = await axios.get(
        `/api/chats/${id}/messages?fromMessageId=${oldesMessageId}`
      );

      const newMessages = [...response.data, ...messages];
      setMessages(newMessages);
      setHasMore(response.data.length > 0);
      setEmptyMessages(newMessages.length === 0);
    } catch (error) {
      console.error('Error on receive data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setMessages([]);
      setLoading(false);
      setHasMore(true);
      setEmptyMessages(false);
    };
  }, [id]);

  const messagesRendered = messages.map((message) => {
    return (
      <Message
        message={message}
        key={message.id}
        isOwnMessage={message.sender !== id}
      />
    );
  });

  const InfiniteScrollEl = <InfiniteScroll
      pageStart={0}
      loadMore={() => {
        console.log('loadMore');
        if (isLoading) return;
        setLoading(true);
        fetchMessageChunk();
      }}
      hasMore={hasMore}
      isReverse={true}
      useWindow={false}
      getScrollParent={() => scrollParentRef}
      loader={<div className={styles.loader} key={0}>Loading ...</div>}
  >
      {messagesRendered}
  </InfiniteScroll>

  const emptyMessages = <div className={styles.empty}>Messages not loaded to server</div>

  return (
    <div className={styles.layout} ref={(ref) => setScrollParentRef(ref)}>
      {isEmptyMessages && emptyMessages}
      {InfiniteScrollEl}
    </div>
  );
};

export default Messages;
