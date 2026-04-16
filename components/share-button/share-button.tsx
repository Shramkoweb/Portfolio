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
      className="flex items-center justify-center w-[44px] h-[44px] cursor-pointer text-gray-600 dark:text-gray-400 hover:scale-110 hover:text-gray-900 dark:hover:text-gray-100 active:scale-[0.97] transition-[color,transform] duration-200 ease-out-expo"
      onClick={handleButtonClick}
      type="button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
