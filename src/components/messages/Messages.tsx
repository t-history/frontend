import {FC, useState, useEffect, useRef} from 'react';
import styles from './Messages.module.scss';
import axios from 'axios';
import MessageEl, {type Message} from './components/MessageEl';
import { useInView } from 'react-intersection-observer';

interface MessagesProps {
  id: number;
}

const Messages: FC<MessagesProps> = ({id}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [oldestMessageId, setOldestMessageId] = useState<Number>(0);

  // const fetchChats = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/chats/${id}/messages?fromMessageId=${oldestMessageId}&limit=20`
  //     );
  //     const messageChunk = response.data;
  //     setMessages([...messages, ...messageChunk]);
  //     setOldestMessageId(messageChunk[messageChunk.length - 1].id);
  //   } catch (error) {
  //     console.error("Error on fetch message chunk:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `/api/chats/${id}/messages`
        );
        const messageChunk = response.data;
        setMessages([...messages, ...messageChunk]);
      } catch (error) {
        console.error("Error on fetch message chunk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();

    return () => {
      setMessages([]);
      setLoading(true);
    }

  }, [id]);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      console.log('In view');
    }
  }, [inView]);

  return <div className={styles.layout}>
    {loading
      ? <div className={styles.empty}>Loading...</div>
      : messages.length === 0
        ? <div className={styles.empty}>Messages not loaded to server</div>
        : messages.map((message, i) => {
            if (i === 15) message.content += ' alalala'
            return <MessageEl
              ref={i === 15 ? ref : null}
              message={message}
              key={message.id}
              isOwnMessage={message.sender !== id}
            />
          })
    }
  </div>
};

export default Messages;