// components/SearchInput.tsx
interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({
  onChange,
  placeholder = 'Search articles',
}: SearchInputProps) {
  return (
    <div className="relative w-full mb-4">
      <input
        aria-label={placeholder}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
      />
      <svg
        className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
}

export { SearchInput };
