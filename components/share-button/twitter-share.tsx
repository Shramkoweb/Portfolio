import { Twitter } from 'lucide-react';
import { ShareButton } from '@/components/share-button/share-button';

export function TwitterShare() {
  const handleClick = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${window.location.href}&text=${document.title} Blog`,
      'twitter-share-dialog',
      'width=800,height=600',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on Twitter">
      <Twitter size={24} />
    </ShareButton>
  );
}
