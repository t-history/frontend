import {FC} from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  abbr: string;
  active: boolean;
}

const Avatar: FC<AvatarProps> = ({abbr, active}) => {
  const color = active ? '#fff' : '';
  return <div
    className={styles.layout}
    style={{color}}
  >
    {abbr}
  </div>
}

export default Avatar;