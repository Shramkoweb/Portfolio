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
      className="w-[44px] h-[44px] flex items-center justify-center "
      onClick={handleButtonClick}
      type="button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
