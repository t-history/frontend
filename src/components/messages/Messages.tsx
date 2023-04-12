import {FC, useState, useEffect} from 'react';
import styles from './Messages.module.scss';
import axios from 'axios';

export interface Message {
  id: number;
  content: string;  
  sender: number;
  unixtime: number;
}

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
    {id}
    {loading
      ? <div>Loading...</div>
      : messages.map((message) => {
        return <div key={message.id}>
          {message.content}
        </div>
      })
    }
  </div>
};

export default Messages;