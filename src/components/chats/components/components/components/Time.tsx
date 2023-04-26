import { FC } from 'react';

import styles from './Time.module.scss';

interface TimeProps {
  unixtime: number;
}

// if today then time hh:mm, if this week then day (like Mon, Tue ... Sun), else date in format dd.mm.yy
const Time: FC<TimeProps> = ({ unixtime }) => {
  const date = new Date(unixtime * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  return <span className={styles.layout}>
    {diffDays === 0 && date.toLocaleTimeString()}
    {diffDays > 0 && diffDays < 7 && date.toLocaleDateString('en-US', { weekday: 'short' })}
    {diffDays >= 7 && date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}
  </span>
}

export default Time;
