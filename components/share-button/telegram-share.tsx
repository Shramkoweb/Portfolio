import { ShareButton } from '@/components/share-button/share-button';

export function TelegramShare() {
  const handleClick = () => {
    window.open(
      `https://telegram.me/share/url?url=${window.location.href}&text=${document.title} Blog`,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on Telegram">
      <svg
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
        <path
          d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
        />
        <path d="m21.854 2.147-10.94 10.939" />
      </svg>
    </ShareButton>
  );
}
