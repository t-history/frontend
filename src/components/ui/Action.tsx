import { FC } from 'react';

import styles from './Action.module.scss';

interface ActionProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Action: FC<ActionProps> = ({
  children,
  active = true,
  onClick = () => {},
  disabled = false
}) => {
  console.log('Action', { active, disabled })
  return <button
    className={`
      ${styles.action}
      ${active && styles['action--active']}
      ${disabled && styles['action--disabled']}
    `}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
};

export default Action;