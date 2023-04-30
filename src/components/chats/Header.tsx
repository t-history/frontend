import { FC } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

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
      <div className={styles.title}>
        {state.wait} - {state.completed} - {state.failed}
      </div>
    }
    <button
      className={`
        ${styles.action}  
        ${showOnlySynchronizableChats ? '' : styles['action--active']}
      `}
      onClick={() => setShowOnlySynchronizableChats(!showOnlySynchronizableChats)}
    >
      {
        showOnlySynchronizableChats ?
          <VscEyeClosed className={`${styles.active}`} /> :
          <VscEye className={`${styles.active}`} />
      }
    </button>
  </div>
};

export default Header;