export interface DetailItem {
  title: string;
  href?: string;
  role?: string;
  description: string;
}

interface Props {
  items: DetailItem[];
}

const linkClasses =
  'underline decoration-gray-300 decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-150 ease-out-expo hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400';

function DetailList(props: Props) {
  const { items } = props;

  return (
    <dl className="not-prose my-6 divide-y divide-gray-200 text-sm dark:divide-gray-800">
      {items.map((item) => (
        <div className="py-4" key={item.title}>
          <dt className="flex flex-wrap items-baseline justify-between gap-x-4 font-medium text-black dark:text-white">
            {item.href ? (
              <a
                className={linkClasses}
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}

            {item.role ? (
              <span className="text-xs font-normal text-gray-500 dark:text-gray-300">
                {item.role}
              </span>
            ) : null}
          </dt>

          <dd className="m-0 mt-1 text-gray-500 dark:text-gray-300">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { DetailList };
