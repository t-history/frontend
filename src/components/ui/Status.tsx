import { FC } from 'react';

import { ChatStatus } from '@/interfaces/Chat';

import styles from './Status.module.scss';

interface StatusProps {
  status: ChatStatus;
}

const Status: FC<StatusProps> = ({ status }) => {

  return <div className={styles.layout + ' ' + styles[status]} />
};

export default Status;