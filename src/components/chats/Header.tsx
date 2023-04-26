import { FC, useEffect, useState } from 'react';

import { IQueueState } from '@/interfaces/QueueState';

import styles from './Header.module.scss';

interface HeaderProps {
  state: IQueueState | null
}

const Header: FC<HeaderProps> = ({ state }) => {
  return <div className={styles.layout}>
    {state &&
      <div className={styles.wait}>
        {state.wait} - {state.completed} - {state.failed}
      </div>
    }
  </div>
};

export default Header;