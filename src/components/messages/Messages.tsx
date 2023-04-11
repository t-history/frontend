import {FC, HTMLAttributes} from 'react';
import styles from './Messages.module.scss';

interface MessagesProps extends HTMLAttributes<HTMLDivElement> {}

const Chats: FC<MessagesProps> = (props) => {
  return <div {...props} className={styles.layout}>
    Messages
  </div>
};

export default Chats;