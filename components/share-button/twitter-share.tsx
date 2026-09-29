import { Twitter } from '@/components/share-button/brand-icons';
import { ShareButton } from '@/components/share-button/share-button';

export function TwitterShare() {
  const handleClick = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${document.title} Blog`)}`,
      'twitter-share-dialog',
      'width=800,height=600,noopener,noreferrer',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on Twitter">
      <Twitter size={24} aria-hidden="true" />
    </ShareButton>
  );
}
