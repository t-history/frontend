import GraphemeSplitter from 'grapheme-splitter';
import { FC } from 'react';

import { ChatStatus } from '@/interfaces/Chat';

import styles from './Avatar.module.scss';
import Status from './Status';

interface AvatarProps {
  title: string;
  active?: boolean;
  status?: ChatStatus;
}

function getFirstLetterInInUpperCase(input: string): string {
  const splitter = new GraphemeSplitter();
  const letters = splitter.splitGraphemes(input);
  return letters[0].toUpperCase();
}

// name abbreviation for chat title (e.g. "Telegram chat with Artem" => "TA")
function makeAbbreviation(input: string): string {
  const words = input.trim().split(/\s+/);
  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  if (words.length === 0 || !firstWord) {
    return 'No name';
  }

  const firstLetter = getFirstLetterInInUpperCase(firstWord);
  const lastLetter = getFirstLetterInInUpperCase(lastWord);

  if (words.length === 1) {
    return firstLetter;
  }

  return firstLetter + lastLetter;
}

const Avatar: FC<AvatarProps> = ({ title, active = false, status }) => {
  const abbr = makeAbbreviation(title);
  const activeClass = active ? styles.active : '';
  return <div className={styles.layout}>
    <div className={`${styles.avatar} ${activeClass}`}>
      {abbr}
    </div>

    {status &&
      <div className={styles.status}>
        <Status status={status}/>
      </div>
    }
  </div>
}

export default Avatar;