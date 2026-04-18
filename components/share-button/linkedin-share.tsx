import { Linkedin } from 'lucide-react';

import { ShareButton } from '@/components/share-button/share-button';

export function LinkedInShare() {
  const handleClick = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?url=${window.location.href}`,
      'linkedin-share-dialog',
      'width=800,height=600',
    );
  };

  return (
    <ShareButton onClick={handleClick} ariaLabel="Share this post on LinkedIn">
      <Linkedin size={24} aria-hidden="true" />
    </ShareButton>
  );
}
