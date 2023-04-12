import {FC} from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  abbr: string;
}

const Avatar: FC<AvatarProps> = ({abbr}) => {
  return <div className={styles.layout}>{abbr}</div>
}

export default Avatar;