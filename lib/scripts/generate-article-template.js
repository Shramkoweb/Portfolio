const fs = require('fs');
const path = require('path');

const slug = process.argv[2];

if (!slug) {
  throw new Error(
    'Specify slug, correct usage: npm run article [article-name]'
  );
}

const mdFileTemplate = fs.readFileSync(
  path.resolve(__dirname, 'new-article-template.md'),
  'utf-8'
);

const dateOfCreation = new Date().toISOString();

const newMdFileContent = mdFileTemplate
  .replace(/{{slug}}/g, slug)
  .replace(/{{createDate}}/g, dateOfCreation)
  .replace(/{{updateData}}/g, dateOfCreation);

const outputMdFilePath = path.resolve(__dirname, '../../_posts', `${slug}.md`);
fs.writeFileSync(outputMdFilePath, newMdFileContent);

// eslint-disable-next-line no-console
console.log(
  [
    'Success!',
    `- article file created ${outputMdFilePath}`,
    `- the article is available at url http://localhost:3000/blog/${slug}`
  ]
    .join('\n')
    .trim()
);
