import { FC } from 'react';
import { VscSync } from 'react-icons/vsc';

import Action from '@/components/ui/Action';
import { IQueueState } from '@/interfaces/QueueState';

import styles from './Queue.module.scss';

interface QueueProps {
  onClose: () => void
  state: IQueueState
}

const Queue: FC<QueueProps> = ({ onClose, state }) => {
  const syncInProgress = state.wait !== 0 || (state.inProgress != null &&  state.inProgress !== 0)

  return <div className={styles.background} onClick={onClose}>
    <div className={styles.queue} onClick={e => e.stopPropagation()}>
      <div className={styles.queue__content}>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Wait</div>
          <div className={styles.queue__item__value}>
              {state.wait}
          </div>
        </div>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>In Progress</div>
          <div className={styles.queue__item__value}>
              {state.inProgress || 0}
          </div>
        </div>
        <div className={styles.queue__item}>
          <div className={styles.queue__item__title}>Failed</div>
          <div className={styles.queue__item__value}>
              {state.failed}
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
      <div className={styles.queue__timer}>
        <div className={styles.queue__item__title}>Time to sync</div>
        <div className={styles.queue__item__value}>
          04:05:06
          {/* {state.timeToSync || 0} */}
        </div>
        <div className={styles.queue__item__action}>
          <Action disabled={syncInProgress}>
            <VscSync className={`${syncInProgress && styles['actions__item--spin']}`} title="Synchronize chat"/>
          </Action>
        </div>

      </div>
    </div>
  </div>
};

export default Queue;