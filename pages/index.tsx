import Image from 'next/image';
import Link from 'next/link';

function IndexPage() {
  return (
    <div
      className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
      <div className="flex flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            Serhii Shramko
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            Senior Developer at&ensp;
            <a
              href="https://macpaw.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline"
            >
              MacPaw
            </a>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hi, I’m a frontend developer from Kyiv,
            with a lot of experience in application development, responsive and adaptive markup.
          </p>

          <Link href="/about">
            <a
              href="/about"
              className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
              Read more about me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="w-[100px] sm:w-[200px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Serhii Shramko"
            height={200}
            width={200}
            quality={100}
            src="/static/images/avatar.jpg"
            sizes="30vw"
            priority
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
