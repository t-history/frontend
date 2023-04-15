import {FC, useState, useEffect} from 'react';
import styles from './Messages.module.scss';
import axios from 'axios';
import MessageEl, {type Message} from './components/MessageEl';
import InfiniteScroll from 'react-infinite-scroller';

interface MessagesProps {
  id: number;
}

const Messages: FC<MessagesProps> = ({id}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>(null);

  const fetchMessageChunk = async () => {
    if (isLoading) return;
    setLoading(true);

    console.log("fetchMessageChunk");
    try {
      const oldesMessageId = messages.length > 0 ? messages[messages.length - 1].id : 0;
      
      const response = await axios.get(
        `/api/chats/${id}/messages?fromMessageId=${oldesMessageId}`
      );

      const newMessages = response.data;
      setMessages([...newMessages, ...messages]);
      setHasMore(newMessages.length > 0);

      // TODO on load last message chunk
    } catch (error) {
      console.error("Error on receive data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setMessages([]);
      setLoading(false);
      setHasMore(true);
    }
  }, []);

  const messagesRendered = messages.map((message) => {
    return <MessageEl message={message} key={message.id} isOwnMessage={message.sender !== id}/>
  });

  const InfiniteScrollEl = <InfiniteScroll
      pageStart={0}
      loadMore={fetchMessageChunk}
      hasMore={hasMore}
      isReverse={true}
      initialLoad={true}
      // useWindow={false}
      // getScrollParent={() => scrollParentRef}
      // loader={<div className={styles.loader} key={0}>Loading ...</div>}
  >
      {messagesRendered}
  </InfiniteScroll>

  return <div className={styles.layout} ref={(ref) => setScrollParentRef(ref)}>
    {InfiniteScrollEl}
    {/* {loading
      ? <div className={styles.empty}>Loading...</div>
      : messages.length === 0
        ? <div className={styles.empty}>Messages not loaded to server</div>
        : InfiniteScrollEl
    } */}
  </div>
};

export default Messages;