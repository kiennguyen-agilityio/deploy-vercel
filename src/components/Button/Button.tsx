import { ReactElement, ReactNode, memo } from 'react';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS, BUTTON_TYPES } from '@/enums/index';

// style
import './Button.css';

export interface Props {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant: BUTTON_VARIANTS;
  size?: BUTTON_SIZES;
  color?: BUTTON_COLORS;
  type?: BUTTON_TYPES;
  onClick?: () => void;
}

const Button = ({
  isDisabled = false,
  isLoading = false,
  label,
  leftIcon,
  rightIcon,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.SMALL,
  color = BUTTON_COLORS.DEFAULT,
  type = BUTTON_TYPES.BUTTON,
  onClick,
}: Props): ReactElement => {
  const classes = `btn btn-${variant} btn-color-${color} btn-${size} ${
    isDisabled ? 'btn-disabled' : ''
  } ${isLoading ? 'btn-loading' : ''}`;

  return (
    <button type={type} className={classes} onClick={onClick} disabled={isDisabled || isLoading}>
      {isLoading && <span className="loader" />}
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default memo(Button);
