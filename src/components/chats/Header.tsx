import { FC, useState } from 'react';
import { createPortal } from 'react-dom'
import { VscInfo, VscEye, VscEyeClosed, VscListUnordered } from 'react-icons/vsc';

import Action from '@/components/ui/Action';
import Info from '@/components/ui/Info';
import Queue from '@/components/ui/Queue';
import { IQueueState } from '@/interfaces/QueueState';
import { useAppContext } from '@/providers/AppContext'

import styles from './Header.module.scss';


interface HeaderProps {
  state: IQueueState | null
}

const Header: FC<HeaderProps> = ({ state }) => {
  const { showOnlySynchronizableChats, setShowOnlySynchronizableChats } = useAppContext()
  const [ isInfoOpen, setIsInfoOpen ] = useState<boolean>(false)
  const [ isQueueOpen, setIsQueueOpen ] = useState<boolean>(false)
  
  return <div className={styles.layout}>
    {/* {state &&
      <div className={styles.title}>
        {state.queued} - {state.completed} - {state.failed}
      </div>
    } */}
    <div className={styles.spacer}></div>
    
    <Action
      active={!showOnlySynchronizableChats}
      onClick={() => setShowOnlySynchronizableChats(!showOnlySynchronizableChats)}
    >
      {
        showOnlySynchronizableChats ?
          <VscEyeClosed title="show not synchronizable chats"/> :
          <VscEye title="hide not synchronizable chats"/>
      }
    </Action>

    <Action active={false} onClick={() => setIsQueueOpen(!isQueueOpen)}>
      <VscListUnordered title="show queue"/>
    </Action>

    <Action active={false} onClick={() => setIsInfoOpen(!isInfoOpen)}>
      <VscInfo title="show info"/>
    </Action>

    {isInfoOpen && createPortal(
      <Info onClose={() => setIsInfoOpen(false)}/>,
      document.body
    )}

    {isQueueOpen && state && createPortal(
      <Queue state={state} onClose={() => setIsQueueOpen(false)}/>,
      document.body
    )}
  </div>
};

export default Header;