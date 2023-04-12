import {FC} from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  title: string;
  active?: boolean;
}

const Avatar: FC<AvatarProps> = ({title, active = false}) => {
  // name abbreviation for chat title (e.g. "Telegram chat with Artem" => "TA")
  const createAbbreviation = (str: string) => {
    const words = str.split(' ');
        
    if (words.length === 0) {
      return 'No name';
    }
    
    const firstLetter = str.charAt(0).toUpperCase();
    if (words.length === 1) {
      return firstLetter
    }

    const lastLetter = words[words.length - 1].charAt(0).toUpperCase();
    
    return `${firstLetter}${lastLetter}`;
  }

  const abbr = createAbbreviation(title);

  const color = active ? '#fff' : '';
  return <div
    className={styles.layout}
    style={{color}}
  >
    {abbr}
  </div>
}

export default Avatar;