import {FC, useState, useEffect} from 'react';
import styles from './Messages.module.scss';
import axios from 'axios';
import MessageEl, {type Message} from './components/MessageEl';

interface MessagesProps {
  id: number;
}

const Messages: FC<MessagesProps> = ({id}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`/api/chats/${id}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error on receive data:", error);
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

  return <div className={styles.layout}>
    {loading
      ? <div>Loading...</div>
      : messages.map((message) => {
        return <MessageEl message={message} key={message.id} />
      })
    }
  </div>
};

export default Messages;