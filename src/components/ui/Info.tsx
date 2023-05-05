import { FC } from 'react';

import styles from './Info.module.scss';

interface ActionProps {
  onClose: () => void;
}

const Action: FC<ActionProps> = ({ onClose }) => {
  const { version, homepage, author } = require('@/../package.json');
  const { name, url } = author;
  return <div className={styles.background} onClick={onClose}>
    <div className={styles.info} onClick={e => e.stopPropagation()}>
      <div className={styles.info__content}>
        <div className={styles.info__item}>
          <div className={styles.info__item__title}>Author</div>
          <div className={styles.info__item__value}>
              <a 
              href={url}
              target="_blank" rel="noreferrer">{name}</a>
          </div>
        </div>
        <div className={styles.info__item}>
          <div className={styles.info__item__title}>Version</div>
          <div className={styles.info__item__value}>{version}</div>
        </div>
        <div className={styles.info__item}>
          <div className={styles.info__item__title}>Source</div>
          <div className={styles.info__item__value}>
            <a href={homepage} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Action;