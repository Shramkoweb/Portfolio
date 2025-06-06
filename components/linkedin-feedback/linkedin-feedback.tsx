import { TLinkedinFeedback } from '@/lib/types';
import Image from 'next/image';

interface Props {
  feedbackList: TLinkedinFeedback[];
}

function LinkedinFeedback(props: Props) {
  const { feedbackList } = props;

  return (
    <section>
      <h2>Feedback ❤️</h2>

      <ul className="list-none p-0 m-0 grid grid-cols-1 gap-8">
        {feedbackList.map((feedback) => (
          <li className="p-0 m-0" key={feedback.text}>
            <blockquote className="p-0 m-0 border-0">
              <cite className="flex">
                <Image
                  width={100}
                  height={100}
                  className="m-0 w-16 h-16 rounded-lg"
                  src={feedback.author.avatar}
                  alt=""
                />

                <div className="flex flex-col ml-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {feedback.author.name}
                  </span>
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
