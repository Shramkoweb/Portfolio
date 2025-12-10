import { Send } from 'lucide-react';
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
      <Send size={24} aria-hidden="true" />
    </ShareButton>
  );
}
