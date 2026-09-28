/**
 * @jest-environment node
 */
import { imageSizeFromFile } from 'image-size/fromFile';

import { rehypeImageSize } from '@/lib/scripts/rehype-image-size';

jest.mock('image-size/fromFile', () => ({ imageSizeFromFile: jest.fn() }));

const mockImageSizeFromFile = imageSizeFromFile as jest.Mock;
const { imageSizeFromFile: realImageSizeFromFile } = jest.requireActual(
  'image-size/fromFile',
);

function expression(value: string) {
  return { type: 'mdxJsxAttributeValueExpression', value };
}

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
  beforeEach(() => {
    mockImageSizeFromFile.mockImplementation(realImageSizeFromFile);
  });

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

  it('scales the height to an explicit width written as an expression', async () => {
    const node = image({ src: 'useref.png', width: expression('400') });

    expect(await run(node)).toMatchObject({ width: '400', height: '225' });
  });

  it('falls back to the intrinsic width when width is not a positive number', async () => {
    const node = image({ src: 'useref.png', width: 'auto' });

    expect(await run(node)).toMatchObject({ width: '1536', height: '864' });
  });

  it('replaces stale width and height instead of duplicating them', async () => {
    const node = image({ src: 'useref.png', width: '400', height: '1' });

    await run(node);

    const names = node.attributes.map((attr) => attr.name);
    expect(names.filter((name) => name === 'width')).toHaveLength(1);
    expect(names.filter((name) => name === 'height')).toHaveLength(1);
  });

  it('leaves an Image without a string src untouched', async () => {
    const node = image({ src: expression('dynamicSrc'), alt: 'x' });
    const before = structuredClone(node.attributes);

    await run(node);

    expect(node.attributes).toEqual(before);
    expect(mockImageSizeFromFile).not.toHaveBeenCalled();
  });

  it('ignores elements that are not Image', async () => {
    const node = { ...image({ src: 'useref.png' }), name: 'img' };

    await run(node);

    expect(mockImageSizeFromFile).not.toHaveBeenCalled();
  });

  it('sizes inline Image elements too', async () => {
    const node = { ...image({ src: 'useref.png' }), type: 'mdxJsxTextElement' };

    expect(await run(node)).toMatchObject({ width: '1536', height: '864' });
  });

  it.each([5, 6, 7, 8])(
    'swaps the axes for EXIF orientation %i',
    async (orientation) => {
      mockImageSizeFromFile.mockResolvedValue({
        width: 4000,
        height: 3000,
        orientation,
      });
      const node = image({ src: 'portrait.jpg', width: '300' });

      expect(await run(node)).toMatchObject({ width: '300', height: '400' });
    },
  );

  it.each([1, 2, 3, 4])(
    'keeps the axes for EXIF orientation %i',
    async (orientation) => {
      mockImageSizeFromFile.mockResolvedValue({
        width: 4000,
        height: 3000,
        orientation,
      });
      const node = image({ src: 'upside-down.jpg', width: '400' });

      expect(await run(node)).toMatchObject({ width: '400', height: '300' });
    },
  );
});
