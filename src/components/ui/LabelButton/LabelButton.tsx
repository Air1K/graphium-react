import React, { FC } from 'react';
import styles from './LabelButton.module.scss';

interface LabelButtonProps {
  label?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const LabelButton: FC<LabelButtonProps> = ({ icon, label, children }) => {
  return (
    <div className={styles.button}>
      <div>
        <div>{icon}</div>
        <label>{label}</label>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default LabelButton;
