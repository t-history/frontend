import {FC} from 'react';
import styles from './Avatar.module.scss';
import GraphemeSplitter from 'grapheme-splitter';

interface AvatarProps {
  title: string;
  active?: boolean;
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

const Avatar: FC<AvatarProps> = ({title, active = false}) => {
  const abbr = makeAbbreviation(title);
  const activeClass = active ? styles.active : '';
  return <div
    className={`${styles.layout} ${activeClass}`}
  >
    {abbr}
  </div>
}

export default Avatar;