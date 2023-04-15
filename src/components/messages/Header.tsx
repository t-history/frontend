import {FC, useState, useEffect} from 'react';
import styles from './Header.module.scss';
import {type TChat} from '@/components/chats/components/ChatItem';
import Avatar from '@/components/ui/Avatar';

interface HeaderProps {
  chat?: TChat;
}

const Header: FC<HeaderProps> = ({chat}) => {
  if (!chat) {
    return <div className={styles.layout}>No chat</div>
  }

  return <div className={styles.layout}>
    <Avatar title={chat.title} />
    {chat && chat.title}
  </div>
};

export default Header;