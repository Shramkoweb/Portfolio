import Image, { ImageProps } from 'next/future/image';

function RoundedImage(props: ImageProps) {
  const { alt = '', ...restProps } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Image alt={alt} className="rounded-lg mt-4 mb-8" {...restProps} width={700} height={100} priority />;
}

const MDXComponents = {
  Image: RoundedImage,
};

export default MDXComponents;
