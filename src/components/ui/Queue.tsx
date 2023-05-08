import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { VscSync } from 'react-icons/vsc';

import Action from '@/components/ui/Action';
import { IQueueState } from '@/interfaces/QueueState';

import styles from './Queue.module.scss';

interface QueueProps {
  onClose: () => void
  state: IQueueState
}

const Queue: FC<QueueProps> = ({ onClose, state }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  let syncInProgress = state.queued !== 0 || (state.in_progress != null &&  state.in_progress !== 0)

  const futureTime = state.nextChatListJob

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (futureTime == null) {
        setTimeLeft(0)
        return
      }
      const timeDiff = futureTime - Math.floor(Date.now());
      setTimeLeft(Math.floor(timeDiff / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [futureTime]);

  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  const handleSync = () => {
    axios.post('/api/queue/sync')
    syncInProgress = true
  }

  return <div className={styles.background} onClick={onClose}>
    <div className={styles.queue} onClick={e => e.stopPropagation()}>
      <div className={styles.queue__content}>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Queued</div>
          <div className={styles.queue__item__value}>
              {state.queued}
          </div>
        </div>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>In Progress</div>
          <div className={styles.queue__item__value}>
              {state.in_progress || 0}
          </div>
        </div>
        {/* <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Version</div>
          <div className={styles.queue__item__value}>{version}</div>
        </div>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Source</div>
          <div className={styles.queue__item__value}>
            <a href={homepage} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div> */}
      </div>
      <div className={styles.queue__content}>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Wait</div>
          <div className={styles.queue__item__value}>
              {state.wait}
          </div>
        </div>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Failed</div>
          <div className={styles.queue__item__value}>
              {state.failed}
          </div>
        </div>
      </div>
      <div className={styles.queue__timer}>
        <div className={styles.queue__item__title}>Time to sync</div>
        <div className={styles.queue__item__value}>
          {formattedTime}
          {/* 04:05:06 */}
          {/* {state.timeToSync || 0} */}
        </div>
        <div className={styles.queue__item__action}>
          <Action disabled={syncInProgress} onClick={handleSync}>
            <VscSync className={`${syncInProgress && styles['queue__item__action--spin']}`} title="Synchronize chat"/>
          </Action>
        </div>

      </div>
    </div>
  </div>
};

export default Queue;