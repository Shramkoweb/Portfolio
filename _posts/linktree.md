---
title: "Building a Link Tree with Astro.js and Vercel: A Step-by-Step Guide"
heading: "My personal Linktree with Astro.js and Vercel"
description: "Learn how to build a fast, efficient link tree website using Astro.js, deploy it with Vercel, set up a custom subdomain, and implement Vercel Analytics for performance insights."
createDate: 2024-08-30T10:00:00.000Z
keywords: [ "astro.js", "vercel", "link tree", "web development", "static site generation", "custom domain", "vercel analytics", "deployment", "performance optimization" ]
categories: [ "Astro", "Vercel", "Tutorial" ]
featured: true
---

<Image src="linktree.jpeg" alt="My linktree" priority />

**1 hour** of work and I have my own link tree website with Astro.js and Vercel on my own subdomain.

Check out the final result: [links.shramko.dev](https://links.shramko.dev/)

## Why Astro.js?

I [wrote about Astro.js](/blog/astro), and I was impressed by its performance and ease of use.
<abbr title='In my humble opinion'>IMHO</abbr>, Astro one of the most promising and fast-growing static site generators out there.

<Image src="astro-chart.jpg" alt="Astro Framework chart on State of JS" />

## Setting Up the Project

I started by creating a new Astro project:

```bash
pnpm create astro@latest
```

You can read small article about why I use [pnpm](/blog/pnpm) 🤘.

## Data for the Link Tree

First of all I created a data file with my links. I used a simple JSON structure:

```json:data/user.json
{
  "name": "Serhii Shramko",
  "profession": "Senior Software Engineer at MacPaw",
  "links": [
    {
      "url": "https://shramko.dev/",
      "icon": "url",
      "title": "Personal Portfolio",
      "description": "All my latest news and blog posts"
    },
    {
      "url": "https://github.com/Shramkoweb",
      "icon": "github",
      "title": "Github Profile",
      "description": "My Github"
    }
  ]
}
```

This approach allows me to easily add, remove, or update links without changing the HTML structure.

## Layout and File Structure

Astro.js allow use simple file structure. And for this project I don't need complex structure. I created an index page:

```jsx:pages/index.astro
---
import Layout from '../layouts/Layout.astro';
import Profile from '../components/Profile.astro';
import List from '../components/List.astro';
// Simple component that renders the main layout, the profile, and the list of links.
---

<Layout title="Link tree | Serhii Shramko">
    <main class="container" id="container">
        <Profile />
        <List />
    </main>
</Layout>
```

```jsx:components/Link.astro
---
import Instagram from "./icons/instagram.astro";
import Linkedin from "./icons/linkedin.astro";
import Url from "./icons/url.astro";
import Youtube from "./icons/youtube.astro";
import Pdf from "./icons/pdf.astro";
import Github from "./icons/github.astro";

interface Props {
    icon: string;
    title: string;
    description: string;
    url: string;
}

const { icon, title, description, url } = Astro.props;
---

<a href={url} class="link" target="_blank">
    <span class="link__icon">
        {icon === 'instagram' && <Instagram />}
        {icon === 'linkedin' && <Linkedin />}
        {icon === 'url' && <Url />}
        {icon === 'youtube' && <Youtube />}
        {icon === 'github' && <Github />}
        {icon === 'pdf' && <Pdf />}
    </span>

    <div class="link__content">
        <h2 class="link__title">{title}</h2>
        <p class="link__description">{description}</p>
    </div>
</a>
```

Astro.js allows you to create components from svg code. I created a separate component for each icon:

```jsx:components/icons/github.astro
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 20 20"></svg>
```

## Analytics

Almost done. Just add Vercel Analytics to the project.

<Image src="astro-analytics.jpg" alt="Analytics on vercel" />

```bash
pnpm add @astrojs/vercel
pnpm add @vercel/analytics
```

```js:astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: { enabled: true }
    }),
});
```

## Deploying to Vercel

[Vercel makes deploying](https://vercel.com/docs/frameworks/astro) Astro projects a breeze. Here's how I did it:

1. I pushed my project to a GitHub repository.
2. I connected my Vercel account to my GitHub account.
3. In the Vercel dashboard, I clicked "New Project" and selected my link tree repository.
4. Vercel automatically detected that it was an Astro project and suggested the correct build settings.
5. I clicked "Deploy" and waited for the magic to happen!

## Custom Domain with Vercel Subdomains

<Image src="vercel-domain.jpg" alt="Domain on vercel" />


To use my custom domain with Vercel, I followed these steps:

1. In the Vercel project settings, I navigated to the "Domains" section.
2. I added my custom domain: `links.shramko.dev`.
3. Done! Vercel automatically set up the necessary DNS records for me.

## Conclusion

Building a link tree with Astro.js and deploying it on Vercel was a smooth and enjoyable process. I spent no more than
an hour and got a fast, efficient, and visually appealing website that and try new technologies.

Sounds great, right? 🌲
