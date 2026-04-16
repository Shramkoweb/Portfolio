import { Search } from 'lucide-react';

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput(props: SearchInputProps) {
  const { onChange, placeholder = 'Search articles' } = props;
  return (
    <div className="relative w-full mb-4">
      <input
        aria-label={placeholder}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
      />
      <Search
        aria-hidden="true"
        className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
      />
    </div>
  );
}

export { SearchInput };
