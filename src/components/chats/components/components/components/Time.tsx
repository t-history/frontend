import { FC } from 'react';

import styles from './Time.module.scss';

interface TimeProps {
  unixtime: number;
}

const isToday = (date: Date) => {
  const now = new Date();
  return date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
}

function isWithinWeekToTomorrow(dateToCheck: Date): boolean {
  const date = new Date(dateToCheck);
  const today = new Date();
  const weekBeforeTomorrow = new Date();
  weekBeforeTomorrow.setDate(today.getDate() - 6);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  tomorrow.setHours(0, 0, 0, 0);
  weekBeforeTomorrow.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date >= weekBeforeTomorrow && date < tomorrow;
};

function isLastYear(date: Date): boolean {
  const today: Date = new Date();
  const lastYear: Date = new Date(today.getFullYear() - 1, today.getMonth()+1);
  
  return date >= lastYear && date < today;
}

const Time: FC<TimeProps> = ({ unixtime }) => {
  const date = new Date(unixtime * 1000);

  const dateRange = isToday(date) ? 'today' : isWithinWeekToTomorrow(date) ? 'week' : isLastYear(date) ? 'year' : 'old';

  return <span className={styles.layout}>
    {dateRange === 'today' && date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    {dateRange === 'week' && date.toLocaleDateString('en-US', { weekday: 'short' })}
    {dateRange === 'year' && date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
    {dateRange === 'old' && date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}
  </span>
}

export default Time;
