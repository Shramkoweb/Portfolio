import { Menu, X } from 'lucide-react';

interface IconProps {
  dataHide: boolean;
}

export function MenuIcon(props: IconProps) {
  const { dataHide } = props;
  return (
    <Menu
      aria-hidden="true"
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      data-hide={dataHide}
      strokeWidth={1.5}
    />
  );
}

export function CrossIcon(props: IconProps) {
  const { dataHide } = props;

  return (
    <X
      aria-hidden="true"
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      data-hide={dataHide}
      strokeWidth={1.5}
    />
  );
}
