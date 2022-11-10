import { PropsWithChildren } from 'react';

interface ShareButtonProps {
  onClick: () => void;
}

export function ShareButton(props: PropsWithChildren<ShareButtonProps>) {
  const { children, onClick } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <button
      className="w-[44px] h-[44px] flex items-center justify-center "
      onClick={handleButtonClick}
      type="button"
    >
      {children}
    </button>
  );
}
