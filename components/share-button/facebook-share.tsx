import { ShareButton } from '@/components/share-button/share-button';

export function FacebookShare() {
  const handleClick = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&src=sdkpreparse`,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  };

  return (
    <ShareButton onClick={handleClick}>
      <svg
        className="w-[18px]"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M256 128C256 57.308 198.692 0 128 0 57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
          fill="currentColor"
        />
        <path
          d="m177.825 165 5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256c6.804 0 13.483-.532 20-1.555V165h29.825"
          fill="transparent"
        />
      </svg>
    </ShareButton>
  );
}
