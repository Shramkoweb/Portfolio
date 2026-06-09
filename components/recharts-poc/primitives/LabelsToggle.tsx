interface LabelsToggleProps {
  value: boolean;
  onChange: (next: boolean) => void;
}

export function LabelsToggle(props: LabelsToggleProps) {
  const { value, onChange } = props;
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600"
    >
      Labels: {value ? 'on' : 'off'}
    </button>
  );
}
