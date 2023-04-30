import { FC } from 'react';

import { IQueueState } from '@/interfaces/QueueState';
import { useAppContext } from '@/providers/AppContext'

import styles from './Header.module.scss';

interface HeaderProps {
  state: IQueueState | null
}

const Header: FC<HeaderProps> = ({ state }) => {
  const { showOnlySynchronizableChats, setShowOnlySynchronizableChats } = useAppContext()
  
  return <div className={styles.layout}>
    {state &&
      <div>
        {state.wait} - {state.completed} - {state.failed}
        <input type="checkbox" checked={showOnlySynchronizableChats} onChange={() => setShowOnlySynchronizableChats(!showOnlySynchronizableChats)} />
      </div>
    }
  </div>
};

export default Header;