/**
 * @jest-environment node
 */
import { rehypeImageSize } from '@/lib/scripts/rehype-image-size';

function image(attributes: Record<string, unknown>) {
  return {
    type: 'mdxJsxFlowElement',
    name: 'Image',
    attributes: Object.entries(attributes).map(([name, value]) => ({
      type: 'mdxJsxAttribute',
      name,
      value,
    })),
    children: [],
  };
}

function attributesOf(node: ReturnType<typeof image>) {
  return Object.fromEntries(
    node.attributes.map((attr) => [attr.name, attr.value]),
  );
}

async function run(node: ReturnType<typeof image>) {
  await rehypeImageSize()({ type: 'root', children: [node] });
  return attributesOf(node);
}

describe('rehypeImageSize', () => {
  it('sets the intrinsic width and height', async () => {
    const node = image({ src: 'useref.png', alt: 'cover' });

    expect(await run(node)).toMatchObject({
      src: 'useref.png',
      alt: 'cover',
      width: '1536',
      height: '864',
    });
  });

  it('scales the height to an explicit width', async () => {
    const node = image({ src: 'useref.png', width: '400' });

    expect(await run(node)).toMatchObject({ width: '400', height: '225' });
  });

  it('finds images nested inside other elements', async () => {
    const node = image({ src: 'useref-same-box.png' });
    const tree = {
      type: 'root',
      children: [{ type: 'element', name: 'p', children: [node] }],
    };

    await rehypeImageSize()(tree);

    expect(attributesOf(node)).toMatchObject({
      width: '1536',
      height: '797',
    });
  });

  it('rejects when the image file is missing', async () => {
    const node = image({ src: 'does-not-exist.png' });

    await expect(run(node)).rejects.toThrow();
  });
});
