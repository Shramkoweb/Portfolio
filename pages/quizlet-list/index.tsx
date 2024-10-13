import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import firstImage from '../../public/static/images/quizlet-list/quizlet-quicklist-1.png';
import secondImage from '../../public/static/images/quizlet-list/quizlet-quicklist-2.png';
import thirdImage from '../../public/static/images/quizlet-list/quizlet-quicklist-3.png';
import fourthImage from '../../public/static/images/quizlet-list/quizlet-quicklist-4.png';

const OG_IMAGE = 'https://shramko.dev/static/images/quizlet-list/og-quizlet.jpg';

function QuizletPage() {
  return (
    <>
      <Head>
        <title>Quizlet QuickList - Chrome Extension</title>
        <meta
          name="description"
          key="description"
          content="Quizlet QuickList is a Chrome extension that helps you easily gather, organize, and export word lists for studying on Quizlet. Simplify your learning experience."
        />
        <meta
          name="keywords"
          key="keywords"
          content="Quizlet, Chrome Extension, Vocabulary, Study, Word List, Learning Tool, Export to Quizlet"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:title"
          key="og:title"
          content="Quizlet QuickList - Chrome Extension"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Simplify vocabulary learning with Quizlet QuickList. Easily gather and export word lists for studying on Quizlet."
        />
        <meta property="og:image" content={OG_IMAGE} key="og:image" />
        <meta
          property="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content="Quizlet QuickList - Chrome Extension"
        />
        <meta
          property="twitter:description"
          key="twitter:description"
          content="Make studying easier by gathering word lists and exporting them to Quizlet with Quizlet QuickList."
        />
        <meta property="twitter:image" key="twitter:image" content={OG_IMAGE} />
        <meta
          property="twitter:site"
          key="twitter:site"
          content="@shramkoweb"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              '{"@context":"https://schema.org","@type":"Product","name":"Quizlet QuickList","description":"A Chrome extension that helps users quickly create and copy lists of selected words for easy use in Quizlet.","url":"https://chrome.google.com/webstore/detail/quizlet-quicklist/extension-id","image":"https://example.com/extension-image.png","brand":{"@type":"Brand","name":"Serhii Shramko Extensions"},"offers":{"@type":"Offer","priceCurrency":"USD","price":"0.00","availability":"https://schema.org/InStock","url":"https://chrome.google.com/webstore/detail/quizlet-quicklist/extension-id"},"applicationCategory":"BrowserExtension","operatingSystem":"Chrome","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"125"}}',
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Quizlet QuickList: The Easiest Way to Collect and Study New Words
        </h1>

        <p>
          Hey there! If you’re like me, you’ve probably come across tons of new
          words while reading online in a foreign language. You know how
          frustrating it can be to stop, copy each word, and paste it somewhere
          to study later.
        </p>

        <p>
          That’s why I created
          {' '}
          <strong>Quizlet QuickList</strong>
          {' '}
          — a Chrome
          extension that makes saving and studying unfamiliar words super easy.
          Now, instead of getting stuck on each word, you can focus on learning
          and have everything neatly organized for Quizlet or any study app you
          love.
        </p>

        <Image
          role="presentation"
          alt="Screenshot showing a webpage with a visible Quizlet QuickList extension on the right side. The extension contains a list of words, including “Emotion,” “About,” etc.” There are buttons to clear the list or copy it."
          src={firstImage}
          priority
        />

        <h2>What’s Quizlet QuickList?</h2>

        <p>
          Imagine you’re reading an article or a webpage in another language,
          and you see a word you don’t know. With Quizlet QuickList, you can
          instantly add it to your list with one click. No more jumping between
          tabs or copying and pasting each word individually. When you’re ready,
          just copy your whole list and drop it into Quizlet to study! It’s
          really that simple.
        </p>

        <h2>Why I Love Using Quizlet QuickList (And You Will Too)</h2>

        <p>
          Here’s why I think Quizlet QuickList will be your new favorite study
          tool:
        </p>

        <ul>
          <li>
            <strong>No more tedious copy-pasting:</strong>
            {' '}
            Just highlight a
            word, click
            {' '}
            <code>Add to Quizlet QuickList</code>
            {' '}
            and boom—it’s saved! You can
            keep reading without any interruptions.
          </li>
          <li>
            <strong>Quick list management:</strong>
            {' '}
            Need to start over? No
            problem. You can clear your word list with one click and keep
            everything tidy.
          </li>
          <li>
            <strong>Copy your list in one click:</strong>
            {' '}
            When you’re ready to
            study, hit
            {' '}
            <code>Copy</code>
            {' '}
            and paste your word list straight into Quizlet (or
            whatever app you use to study).
          </li>
          <li>
            <strong>Perfect for language learners:</strong>
            {' '}
            Whether you&#39;re
            just starting out with a new language or brushing up on your skills,
            this tool will save you a ton of time.
          </li>
        </ul>

        <h2>Features That Make Your Life Easier</h2>

        <h3>Step - 1. Add words instantly</h3>

        <Image
          role="presentation"
          alt="A screenshot of a webpage displaying highlighted text. A context menu is opened, with the option “Add to Quizlet QuickList” highlighted. This indicates the ability to quickly add a selected word to the Quizlet QuickList extension from a webpage."
          src={secondImage}
        />

        <p>
          <em>
            Highlight a word, click
            {' '}
            <code>Add to Quizlet QuickList</code>
            , and
            it&#39;s saved to your list!
          </em>
        </p>

        <h3>Step - 2. Clear your list with one click</h3>

        <Image
          role="presentation"
          alt="A screenshot of a browser window showing the “Quizlet QuickList” Chrome extension. The list is currently empty, with a message that reads “No words added yet.” Below the message, there is an input field labeled “Enter a word,” a “Clear List” button, and a “Copy” button. "
          src={thirdImage}
        />

        <p>
          Once you’ve got your words ready, just hit
          {' '}
          <code>Clear List</code>
          {' '}
          to
          start fresh.
        </p>

        <h3>Step - 3. Seamless Quizlet integration</h3>

        <Image
          role="presentation"
          alt="A screenshot showing the Quizlet flashcard set creation interface. On the left, the user is creating a flashcard set titled “My first flashcard set.” Each flashcard has an English term and its corresponding Spanish definition."
          src={fourthImage}
          priority
        />

        <p>
          When you’ve added all the words you need, just click
          {' '}
          <code>Copy</code>
          {' '}
          and paste it anywhere. Easy peasy. 🚀
        </p>

        <p>
          Quizlet QuickList is designed to work smoothly with Quizlet, so you
          can quickly turn your word list into custom flashcards.
        </p>

        <h2>How to Use Quizlet QuickList</h2>

        <p>
          Using Quizlet QuickList is so easy, you’ll wonder how you ever lived
          without it:
        </p>

        <ol>
          <li>
            <strong>Install the Extension:</strong>
            {' '}
            Grab Quizlet QuickList from
            the Chrome Web Store (link).
          </li>
          <li>
            <strong>Highlight and Add Words:</strong>
            {' '}
            As you’re browsing and see
            words you don’t know, highlight them and click “Add to Quizlet
            QuickList”.
          </li>
          <li>
            <strong>Manage Your Word List:</strong>
            {' '}
            Ready to study? Copy your
            list in one click or clear it when you’re done.
          </li>
          <li>
            <strong>Sync with Quizlet:</strong>
            {' '}
            Paste your list into Quizlet,
            create custom study sets, and you’re all set to learn.
          </li>
        </ol>

        <h2>Why It’s Awesome for Language Learners</h2>

        <p>
          Quizlet QuickList takes all the annoying parts of collecting new words
          and makes them super simple. Instead of wasting time switching tabs,
          copying, pasting, or organizing your notes, you can focus on learning.
          And since it integrates smoothly with Quizlet, you can build
          flashcards in seconds and get straight to studying.
        </p>

        <p>
          If you’re serious about learning a new language or just picking up
          some new vocabulary here and there,
          <strong>Quizlet QuickList</strong>
          {' '}
          is going to make your life way
          easier.
        </p>

        <h2>FAQs</h2>

        <p>
          <strong>Q: Is Quizlet QuickList free?</strong>
          <br />
          A: Yep! It’s totally free to use.
        </p>

        <p>
          <strong>Q: Do I need a Quizlet account to use it?</strong>
          <br />
          A: No, you don’t need one, but Quizlet QuickList works great with
          Quizlet if you want to use flashcards.
        </p>

        <p>
          <strong>Q: Can I use it on any website?</strong>
          <br />
          A: Absolutely! As long as you can highlight the text, you can add
          words to your list.
        </p>

        <p>
          <strong>Q: Where I can find Privacy Policy page?</strong>
          <br />
          A:
          {' '}
          <Link href="/quizlet-list/privacy-policy">Privacy policy page</Link>
        </p>

        <p>
          Ready to make language learning easier?
          {' '}
          <a href="#">Download Quizlet QuickList here</a>
          {' '}
          and start building
          your vocab list today! Trust me, you’ll wish you had this tool sooner.
        </p>
      </section>
    </>
  );
}

export default QuizletPage;
