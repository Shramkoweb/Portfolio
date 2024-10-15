import { PropsWithChildren } from 'react';

interface ShareButtonProps {
  onClick: () => void;
  ariaLabel: string;
}

export function ShareButton(props: PropsWithChildren<ShareButtonProps>) {
  const { children, onClick, ariaLabel } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <button
      className="flex items-center justify-center w-[44px] h-[44px]"
      onClick={handleButtonClick}
      type="button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
