import { event } from '@/lib/ga';

const handleYesClick = () => {
  event({
    action: 'Reaction click',
    category: 'Blog - article',
    label: 'Yes',
  });
};

const handleNoClick = () => {
  event({
    action: 'Reaction click',
    category: 'Blog - article',
    label: 'No',
  });
};

export function PostReaction() {
  return (
    <div
      className="flex flex-col p-6 sm:p-8 border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 rounded-md w-full mt-16"
    >
      <div className="items-center justify-between flex flex-col sm:flex-row">
        <div className="flex items-center">
          <div className="flex flex-col ml-3">
            <h3 className="text-black dark:text-white font-bold">Was this article helpful ?</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Help me improve my blog</p>
          </div>
        </div>

        <ul className="flex gap-4 mt-8 sm:m-0">
          <li>
            <button
              onClick={handleYesClick}
              className="w-[100px] border text-black dark:text-white border-gray-300 dark:border-gray-700 p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
              type="button"
            >
              Yes
            </button>
          </li>
          <li>
            <button
              onClick={handleNoClick}
              className="w-[100px] border text-black dark:text-white border-gray-400 dark:border-gray-700  p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
              type="button"
            >
              No
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
