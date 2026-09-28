import path from 'node:path';

import { imageSizeFromFile } from 'image-size/fromFile';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'static', 'images');

type JsxAttribute = { type: string; name?: string; value?: unknown };

type Node = {
  type: string;
  name?: string | null;
  attributes?: JsxAttribute[];
  children?: Node[];
};

function collectImages(node: Node, images: Node[]) {
  if (
    (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
    node.name === 'Image'
  ) {
    images.push(node);
  }
  node.children?.forEach((child) => collectImages(child, images));
}

function readAttribute(node: Node, name: string) {
  const attribute = node.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name,
  );
  return typeof attribute?.value === 'string' ? attribute.value : undefined;
}

function setAttribute(node: Node, name: string, value: number) {
  node.attributes = (node.attributes ?? []).filter(
    (attr) => !(attr.type === 'mdxJsxAttribute' && attr.name === name),
  );
  node.attributes.push({
    type: 'mdxJsxAttribute',
    name,
    value: String(value),
  });
}

async function applyIntrinsicSize(node: Node) {
  const src = readAttribute(node, 'src');
  if (!src) return;

  const size = await imageSizeFromFile(path.join(IMAGES_DIR, src));
  const rotated = (size.orientation ?? 1) >= 5;
  const intrinsicWidth = rotated ? size.height : size.width;
  const intrinsicHeight = rotated ? size.width : size.height;

  const explicitWidth = Number(readAttribute(node, 'width'));
  const width = explicitWidth > 0 ? explicitWidth : intrinsicWidth;

  setAttribute(node, 'width', width);
  setAttribute(
    node,
    'height',
    Math.round((width * intrinsicHeight) / intrinsicWidth),
  );
}

export function rehypeImageSize() {
  return async (tree: Node) => {
    const images: Node[] = [];
    collectImages(tree, images);
    await Promise.all(images.map(applyIntrinsicSize));
  };
}
