import { ReactNode, memo } from 'react';

type Props = {
  icon: ReactNode;
  className: string;
};

const Icon: React.FC<Props> = ({ icon, className }) => {
  return <span className={className}>{icon}</span>;
};

export default memo(Icon);
