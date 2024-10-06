import Head from 'next/head';

function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Quizlet QuickList Chrome Extension</title>
        <meta
          content="Privacy policy for the Quizlet QuickList Chrome Extension. Learn how we handle your data and keep your privacy secure."
          name="description"
          key="description"
        />
        <meta
          content="privacy policy, Quizlet QuickList, Chrome extension, user data, permissions, security"
          name="keywords"
          key="keywords"
        />
        <meta name="author" content="Serhii Shramko" />
        <meta
          property="og:title"
          key="og:title"
          content="Privacy Policy | Quizlet QuickList Chrome Extension"
        />
        <meta
          property="og:description"
          key="og:description"
          content="This is the privacy policy for the Quizlet QuickList Chrome Extension, explaining what data is collected, how it is used, and your rights as a user."
        />
        {/* TODO */}
        {/* <meta property="og:image" content="https://example.com/your-image-url.jpg"> */}
        {/*   <meta property="og:url" content="https://example.com/privacy-policy"> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Privacy Policy | Quizlet QuickList Chrome Extension"
        />
        <meta
          name="twitter:description"
          content="This is the privacy policy for the Quizlet QuickList Chrome Extension. Learn how your data is handled securely."
        />
        {/* <meta name="twitter:image" content="https://example.com/your-image-url.jpg"> */}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              '{"context":"https://schema.org","@type":"WebPage","mainEntity":{"@type":"WebPage","name":"Privacy Policy","description":"This is the privacy policy for the Quizlet QuickList Chrome Extension, explaining how we handle user data and privacy.","url":"https://shramko.dev/quizlet-list/privacy-policy","inLanguage":"en","datePublished":"2024-10-05","dateModified":"2024-10-05","publisher":{"@type":"Organization","name":"Quizlet QuickList","url":"https://shramko.dev/quizlet-list","contactPoint":{"@type":"ContactPoint","email":"shramko.dev@gmail.com","contactType":"Customer Support","areaServed":"Worldwide","availableLanguage":["English"]}},"author":{"@type":"Person","name":"Serhii Shramko","url":"https://shramko.dev/about"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://shramko.dev/quizlet-list"},{"@type":"ListItem","position":2,"name":"Privacy Policy","item":"https://shramko.dev/quizlet-list/privacy-policy"}]}}}',
          }}
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Privacy Policy - Quizlet QuickList Chrome Extension
        </h1>

        <div className="mb-8 prose dark:prose-dark leading-6 text-gray-700 dark:text-gray-200">
          <p>
            Effective Date:
            <strong>
              <time dateTime="2024-10-05">5 October, 2024</time>
            </strong>
          </p>

          <p>
            Thank you for using the Quizlet QuickList Chrome Extension (the
            “Extension”). Your privacy is important to us, and we are committed
            to protecting the information that you share while using this
            Extension. This Privacy Policy explains how we collect, use, and
            safeguard your data.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>a) Personal Information:</h3>
          <p>
            The Extension
            {' '}
            <strong>
              does not collect, store, or share any personal information
            </strong>
            {' '}
            such as your name, email address, or contact details. The Extension
            operates entirely locally within your browser and does not send any
            data to external servers or third parties.
          </p>

          <h3>b) Usage Data:</h3>
          <p>
            The Extension may collect anonymous usage statistics (such as error
            logs and usage frequency) for the purpose of improving functionality
            and user experience. However, this data is not personally
            identifiable and is only collected with your consent.
          </p>

          <h3>c) Word List Data:</h3>
          <p>
            The words you add to your list through the Quizlet QuickList
            Extension are stored locally on your device, using Chrome’s storage
            system. This data is not accessible to us, and we do not share it
            with any third party. You have full control over your word list, and
            you can delete or modify it at any time.
          </p>

          <h2>2. Permissions Used</h2>
          <p>
            The Extension requires certain permissions in order to function
            correctly:
          </p>
          <ul>
            <li>
              <strong>Context Menus:</strong>
              {' '}
              This permission is used to add
              options to the right-click context menu, allowing you to quickly
              add selected words or phrases to your list.
            </li>
            <li>
              <strong>Storage:</strong>
              {' '}
              The storage permission is required to
              save your word list locally on your device.
            </li>
            <li>
              <strong>Host Permissions:</strong>
              {' '}
              The Extension has access to web
              pages you visit to allow you to select and add words from these
              pages to your list. The Extension does not track or log your
              browsing activity, and no data is sent externally from your
              device.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>
              The Extension does not share any data with external parties.
            </li>
            <li>
              We may use anonymous usage data (if collected) to improve the
              performance and functionality of the Extension.
            </li>
            <li>
              Your word lists are stored locally and are not accessible by us or
              any third-party services.
            </li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            The Extension does not integrate with or send data to third-party
            services. Any content you interact with using the Extension (such as
            copying and pasting to Quizlet) happens entirely on your local
            machine and is not transmitted to external servers by the Extension.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We are committed to keeping your data safe. As the Extension
            operates entirely on your device and does not transmit personal or
            usage data externally, there is minimal risk of data breaches
            related to the Extension.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Any
            changes will be posted on this page, and the effective date at the
            top will be updated accordingly. We encourage you to review this
            Privacy Policy periodically to stay informed about how we are
            protecting your information.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            the privacy practices of the Extension, please contact us at:
          </p>
          <p>
            <strong>
              <a href="mailto:shramko.dev@gmail.com?subject=Privacy Policy - Quizlet QuickList">
                shramko.dev@gmail.com
              </a>
            </strong>
          </p>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
