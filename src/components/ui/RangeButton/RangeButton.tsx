import React, { FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import LabelButton from '../LabelButton/LabelButton';

interface RangeButtonProps {
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  onClickUp?: () => void;
  onClickDown?: () => void;
}

const RangeButton: FC<RangeButtonProps> = ({ icon, label, value, onClickUp, onClickDown }) => {
  return (
    <LabelButton label={label} icon={icon}>
      <button onClick={onClickDown}>{<FiMinus color={'white'} />}</button>
      <span>{value}</span>
      <button onClick={onClickUp}>{<FiPlus color={'white'} />}</button>
    </LabelButton>
  );
};

export default RangeButton;
