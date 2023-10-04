---
title: What is Astro Framework?
description: Astro is a new Javascript framework, so discover what makes it special and what are its core features.
createDate: 2023-03-16T09:01:43.973Z
keywords: [ astro js, astro framework, astro js tutorial, what is astro, how to build fast, cms javascript framework ]
categories: [ JS, TS, Astro, JamStack ]
featured: true
---

<Image src="astro.jpg" alt="" />

Astro is a framework for building static sites and web applications. It is built on top of modern web technologies like
JavaScript, HTML, and CSS, and uses a component-based architecture to make it easy to build and maintain complex web
projects. With Astro, you can build websites and applications that are fast, efficient, and easy to scale.

## Key Features

Astro offers several key features that make it a powerful tool for building modern web projects.
These include:

- **Performance**: Astro is designed to be fast and efficient, with built-in optimizations that help to reduce page load
  times and improve overall site performance.
- **Ease of use**: Astro is designed to be easy to use, with a simple and intuitive syntax that makes it easy to create
  complex web projects.
- **Themes**: Astro has an impressive array of ready-made [themes](https://astro.build/themes/) and templates to get
  started quickly.
- **Zero JS, by default**: No JavaScript runtime.
- **Component-based** architecture: Astro uses a component-based architecture that makes it easy to build and maintain
  complex web projects.
- **Template directives**: Astro's template directives make it easy to create reusable components that can be used
  throughout your site or application.
- **Built-in CMS functionality**:  Tailwind, MDX, and 100+ other integrations to choose from.
- **UI-agnostic**: Supports React, Preact, Svelte, Vue, Solid, and more.

## Creating Your First Astro Project

To create your first Astro project, you'll need to install the Astro CLI. You can do this by running the following
command:

```shell
# create a new project with npm
npm create astro@latest
```

Then navigate to the project directory and start the development server by running the following commands:

```shell
npm run dev
```

<Image src="astro-dev.jpeg" alt="" />

This will start a live Astro development server, which will automatically rebuild your site as you make changes to your
code.

## File-based routing

One of the key features of Astro is its file-based routing system. With this system, developers can easily create routes
and pages for their websites by simply creating files in the appropriate directories. This makes it easy to create and
manage complex routing structures without the need for additional configuration or setup.

### Static routes

Any `.astro` page elements, as well as Markdown and MDX files (with extensions ".md" and ".mdx"), located in the `
src/pages/` directory, will be automatically transformed into pages on your website. The page's URL will match its path
and file name within the "src/pages/" directory.

```shell
# Example: Static routes for site.com
src/pages/index.astro             -> site.com/
src/pages/about.astro             -> site.com/about
src/pages/about/index.astro       -> site.com/about # Nested folder with index file
src/pages/about/career.astro      -> site.com/about/career
src/pages/articles/1.md           -> site.com/articles/1
```

### Dynamic routes

In an Astro page file, it's possible to define dynamic route parameters within the file name. This allows for the
creation of multiple pages that match the specified parameter.

For instance, by using the file name `src/pages/users/[user].astro`, you can generate a user's page for each user
featured on your blog. The `user` in the file name serves as a parameter that can be accessed within the page.

Because all routes must be determined at build time, a dynamic route must export a `getStaticPaths()` that returns an
array of objects with a params property. Each of these objects will generate a corresponding route.

```md:src/pages/users/[user].astro
---
export function getStaticPaths() {
  return [
    {params: {user: 'Serhii'}},
    {params: {user: 'Roman'}},
    {params: {user: 'Alexander'}},
  ];
}

const { user } = Astro.params;
---

<div>Hello, {user}!</div>
```

## Astro Component Structure

The Astro component consists of two primary components: the Component Script and the Component Template.

```md:src/components/Component.astro
---
// Component Script (JavaScript)
---
<!-- Component Template (HTML + JS Expressions) -->
```

## Astro slots

The `<slot />` element is a placeholder for external HTML content, allowing you to inject (or “slot”) child elements
from other files into your component template.

By default, all child elements passed to a component will be rendered in its `<slot />`

```md:src/components/Wrapper.astro
---
const { title } = Astro.props
---

<div class="wrapper">
  <h1 class="wrapper__title">{title}</h1>
  <slot />  <!-- children will go here -->
</div>
```

```md:src/pages/content.astro
---
import Wrapper from '../components/Wrapper.astro';
---

<Wrapper title="Main Page">
  <p>Here is some stuff.</p>
</Wrapper>
```

## Data Fetching

All Astro components have access to the global [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
function in their component script to make HTTP requests to APIs.

This fetch call will be executed at build time, and the data will be available to the component template for generating
dynamic HTML. If SSR mode is enabled, any fetch calls will be executed at runtime.

I use [randomuser.me](https://randomuser.me/) API to this example. Please, read the documentation before.

```md:src/components/User.astro
---
import Avatar from '../components/Avatar.jsx';

const response = await fetch('https://randomuser.me/api/');
const { results } = await response.json();
const [ user ] = results;
---
<!-- Data fetched at build can be rendered in HTML -->
<h1>{user.name.first} {user.name.last}</h1>
<p>{user.email}</p>

<!-- Data fetched at build can be passed to components as props -->
<Avatar picture={user.picture.large} />
```

> Before using React inside Astro add [integration](https://docs.astro.build/en/guides/integrations-guide/react/)

<Image src="astro-dev.gif" alt="" />

You can read more about data fetching in [official documentation](https://docs.astro.build/en/guides/data-fetching/).

## Styles & CSS

You can either compose your own CSS code within an Astro component or bring in your preferred CSS library, such as
[Tailwind](https://github.com/withastro/astro/tree/main/packages/integrations/tailwind). Additionally, Astro supports
sophisticated styling languages like `Sass` and `Less`.

```md:src/components/Component.astro
<style>
  h1 { color: orange; }
</style>
```

Astro supports a wide amount of popular styling techniques out of the box:

- Import a local stylesheet
- Use a \<style\> block anywhere in `.astro` files and the CSS will be scoped to that component
- [CSS modules](https://css-tricks.com/css-modules-part-1-need/)
- [CSS Preprocessors](https://docs.astro.build/en/guides/styling/#css-preprocessors) [Sass/Less/Stylus]

> The [styling doc](https://docs.astro.build/en/guides/styling/) has more detail.

## Template Directives

By default, a UI Framework component is not hydrated in the client. If no client:* directive is provided, its HTML is
rendered onto the page without JavaScript.

### client:load

- **Priority**: High
- **Useful for**: UI elements that require immediate interactivity and should be visible right away

> Load and hydrate the component JavaScript immediately on page load.

```jsx
<BuyButton client:load />
```

### client:idle

- **Priority**: Medium
- **Useful for**: UI elements with lower priority that do not require immediate interactivity

> Load and hydrate the component JavaScript once the page is done with its initial load.

```jsx
<BuyButton client:idle />
```

### client:visible

- **Priority**: Low
- **Useful for**: UI elements with low priority can be positioned either far down the page or require significant
  resources to load. In case the user never sees such elements, it would be preferable not to load them at all

> Load and hydrate the component JavaScript once the component has entered the user’s viewport.

```jsx
<ImageCarousel client:visible />
```

### client:media

- **Priority**: Low
- **Useful for**: Elements that might only be visible on certain screen sizes.

> Loads and hydrates the component JavaScript once a certain CSS media query is met.

```jsx
<Sidebar client:media="(max-width: 1024px)" />
```

### client:only

Skips HTML server rendering, and renders only on the client.

```jsx
<ReactComponent client:only="react" />
<SvelteComponent client:only="svelte" />
<Component client:only="vue" />
```

## Do you need to learn the Astro?

At the [moment](https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/), Astro is considered a very
interesting framework that most people want to learn and understand. So be the first to figure it out 🚀.

<Image src="astro-state.jpeg" alt="Astro framework interest on stateofjs" />

## Useful Links

If you're interested in learning more about Astro, here are some useful links to get you started:

- [Astro home page](https://astro.build/)
- [Astro documentation](https://docs.astro.build/en/getting-started/)
- [Astro GitHub repository](https://github.com/withastro/astro)
- [Are SPAs better than MPAs? | HTTP 203](https://www.youtube.com/watch?v=ivLhf3hq7eM)
- [Astro usage in npm and ratings](https://bestofjs.org/projects/astro)

