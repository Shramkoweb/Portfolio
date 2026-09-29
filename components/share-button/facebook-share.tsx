import { Facebook } from '@/components/share-button/brand-icons';
import { ShareButton } from '@/components/share-button/share-button';

export function FacebookShare() {
  const handleClick = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&src=sdkpreparse`,
      'facebook-share-dialog',
      'width=800,height=600,noopener,noreferrer',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on Facebook">
      <Facebook size={24} aria-hidden="true" />
    </ShareButton>
  );
}
