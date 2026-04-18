import Image from 'next/image';

import type { LinkedinFeedback as LinkedinFeedbackType } from '@/lib/types';

interface Props {
  feedbackList: LinkedinFeedbackType[];
}

function LinkedinFeedback(props: Props) {
  const { feedbackList } = props;

  return (
    <section>
      <h2>Feedback ❤️</h2>

      <ul className="list-none p-0 m-0 grid grid-cols-1 gap-8">
        {feedbackList.map((feedback) => (
          <li className="p-0 m-0" key={feedback.author.name}>
            <blockquote className="p-0 m-0 border-0">
              <cite className="flex">
                <Image
                  width={64}
                  height={64}
                  sizes="64px"
                  className="m-0 w-16 h-16 rounded-lg"
                  src={feedback.author.avatar}
                  alt={`${feedback.author.name} avatar`}
                />

                <div className="flex flex-col ml-3">
                  <a
                    href={feedback.author.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="not-prose">{feedback.author.name}</h3>
                  </a>
                  <p className="m-0 text-gray-700 dark:text-gray-300 text-xs">
                    {`${feedback.author.position} `}
                    <a
                      href={feedback.author.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{feedback.author.company.name}
                    </a>
                  </p>
                </div>
              </cite>
              <p>{feedback.text}</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { LinkedinFeedback };
