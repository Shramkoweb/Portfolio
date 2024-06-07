import clsx from 'clsx';

import { event } from '@/lib/ga';
import { Feedback } from '@/lib/types';
import { useFeedbackReducer } from './use-feedback-reducer';

const responseTextByFeedback = {
  [Feedback.Helpful]: {
    title: 'Thanks for the feedback!',
    subtitle: '❤️',
  },
  [Feedback.Worthless]: {
    title: 'Sorry to hear that.',
    subtitle:
      '<a class="underline text-[#3b82f6] hover:text-[#2563eb]" href="mailto:shramko.dev@gmail.com?subject=Improve Article">Get in touch</a> to let me know what I could do better.',
  },
  [Feedback.Blank]: {
    title: 'Was this article helpful ?',
    subtitle: 'Help me improve my blog',
  },
};

export function PostReaction() {
  const { state, actions } = useFeedbackReducer();
  const isReactionUntouched = state.feedback === Feedback.blank;

  const handleYesClick = () => {
    actions.helpful();
    event({
      action: 'Reaction click',
      category: 'Blog - article',
      label: 'Yes',
    });
  };

  const handleNoClick = () => {
    actions.worthless();
    event({
      action: 'Reaction click',
      category: 'Blog - article',
      label: 'No',
    });
  };

  const wrapperClassName = clsx('items-center justify-between flex flex-col', {
    'flex-row text-center': !isReactionUntouched,
    'sm:flex-row': isReactionUntouched,
  });

  return (
    <div className="flex flex-col p-6 sm:p-8 border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 rounded-md w-full mt-16">
      <div className={wrapperClassName}>
        <div className="flex items-center">
          <div className="flex flex-col">
            <h3 className="text-black dark:text-white font-bold">
              {responseTextByFeedback[state.feedback].title}
            </h3>
            <p
              className="text-sm text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: responseTextByFeedback[state.feedback].subtitle,
              }}
            />
          </div>
        </div>

        {isReactionUntouched && (
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
        )}
      </div>
    </div>
  );
}
