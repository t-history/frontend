import {FC} from 'react';
import Chat from './components/Chat';
import styles from './Chats.module.scss';


interface ChatsProps {
  data: any[];
  loading: boolean;
}

const Chats: FC<ChatsProps> = ({data, loading}) => {
  return <div className={styles.layout}>
    {
      loading
        ? <div>Loading...</div>
        : data.map((chat, i) => <Chat chat={chat} key={i} />)
    }
  </div>
};

export default Chats;