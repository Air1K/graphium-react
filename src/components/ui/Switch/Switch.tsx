import { FC } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };
  return (
    <label className={styles.switch}>
      <input type='checkbox' checked={value} onChange={handleChange} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Switch;
