import { Send } from 'lucide-react';

import { ShareButton } from '@/components/share-button/share-button';

export function TelegramShare() {
  const handleClick = () => {
    window.open(
      `https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${document.title} Blog`)}`,
      'telegram-share-dialog',
      'width=800,height=600,noopener,noreferrer',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on Telegram">
      <Send size={24} aria-hidden="true" />
    </ShareButton>
  );
}
