import {FC, useState, useEffect} from 'react';
import styles from './Header.module.scss';
import axios from 'axios';
// import MessageEl, {type Message} from './components/Message';
import {type Chat} from '@/components/chats/components/Chat';
import Avatar from '@/components/ui/Avatar';

interface HeaderProps {
  id: number;
}

const Header: FC<HeaderProps> = ({id}) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`/api/chats/${id}`);
        setChat(response.data);
      } catch (error) {
        console.error("Error on receive data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();

    return () => {
      setChat(null);
      setLoading(true);
    }

  }, [id]);

  if (loading) {
    return <div className={styles.layout}>Loading...</div>
  }

  if (!chat) {
    return <div className={styles.layout}>No chat</div>
  }

  return <div className={styles.layout}>
    <Avatar title={chat.title} />
    {chat && chat.title}
  </div>
};

export default Header;