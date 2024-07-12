---
title: 'Common CSS Class Names'
description: Explore the world of CSS class names and learn how to use common words in your classes, following the Block Element Modifier (BEM) methodology for structured and maintainable web styling. Dive into the best practices of CSS naming and create a more organized codebase.
createDate: 2023-10-25
keywords: [ Common CSS class names, BEM methodology, CSS naming conventions, Structured web styling, Block Element Modifier, CSS best practices, Naming conventions in CSS ]
---

Let's explore some common words and phrases used within CSS classes following the BEM guidelines.

## Text

- `title`, `subject`, `heading`, `headline`, `caption`: These classes are used for styling headings.
- `subtitle`: The `subtitle` class is used for subheadings.
- `slogan`: It's often used for styling slogans.
- `lead`, `tagline`: These classes are used for styling lead paragraphs in text.
- `text`: The `text` class is used for styling textual content.
- `desc`: This class is used for styling descriptions or alternative text content.
- `excerpt`: Often used for styling text excerpts, usually before a "Read more..." link.
- `quote`, `blockquote`: These classes are used for styling quotes.
- `snippet`: The `snippet` class is applied to style code examples.
- `link`: This class is used for styling links.
- `copyright`, `copy`: These classes are often used for styling copyright information.

## Images

- `image`, `img`, `picture`, `pic`: These classes are often used for styling images.
- `icon`: This class is used to style icons.
- `logo`: The `logo` class is commonly used for styling logos.
- `userpic`, `avatar`: These classes are used for styling small user images.
- `thumbnail`, `thumb`: These classes are applied to style thumbnail or reduced-size images.

## Lists

- `list`, `items`: These classes are applied for styling lists.
- `item`: The `item` class is used for styling list items.

## Blocks

- `page`: The `page` class represents the root element of a page.
- `header`: It's commonly used for styling the header of a page or an element.
- `footer`: The `footer` class is used for styling page or element footers.
- `section`: This class is applied to style content sections (one of many).
- `main`, `body`: These classes are often used for styling the main content area of a page or an element.
- `content`: The `content` class is used for styling the content within an element.
- `sidebar`: It's used for styling side columns on a page or an element.
- `aside`: This class is applied to style blocks containing additional information.
- `widget`: The `widget` class is used for styling widgets, often found in side columns.

## Layout

- `wrapper`, `wrap`: These classes are used for styling the outer container, typically the top-level structure.
- `inner`: The `inner` class is applied for styling the inner container.
- `container`, `holder`, `box`: These classes are used for styling container elements.
- `grid`: The `grid` class is often applied to style [grid layouts](/blog/react-flexbox-grid), usually containing `row`
  and `col` elements.
- `row`: It's used for styling row containers in a grid.
- `col`, `column`: These classes are used for styling column containers in a grid.

## User Interface Controls

- `button`, `btn`: These classes are often used for styling buttons, e.g., for form submissions.
- `control`: The `control` class is used for styling control elements, such as forward/backward arrows in a photo
  gallery or slider navigation buttons.
- `dropdown`: This class is applied to style dropdown lists.

## Media Queries

- `phone`, `mobile`: These classes are used for styling elements for mobile devices.
- `phablet`: It's used for larger-screen phones (6-7").
- `tablet`: The `tablet` class is often used for styling tablets.
- `notebook`, `laptop`: These classes are applied to style laptop-related elements.
- `desktop`: It's used for styling desktop-related elements.

## Sizing

- `tiny`, `xs`: These classes are used for styling tiny or extra-small elements.
- `small`, `sm`: The `small` class is often used for small elements.
- `medium`, `base`: These classes are used for styling medium-sized elements.
- `big`, `large`, `lg`: The `big` class is often used for large elements.
- `huge`, `xl`: These classes are applied for styling huge or extra-large elements.
- `narrow`: It's used for styling narrow elements.
- `wide`: The `wide` class is applied for styling wide elements.

## Miscellaneous

- `visually-hidden`: [Visually hides](/snippets/visually-hidden) an element while keeping it accessible to screen readers
- `search`: This class is often used for styling search elements.
- `socials`: The `socials` class is used for styling blocks of social media icons.
- `advertisement`, `adv`, `commercial`, `promo`: These classes are often used for styling advertisement blocks, but it's
  not recommended to use them for internal ads that may be blocked by ad blockers.
- `features`, `benefits`: These classes are used for styling lists of product or service features.
- `slider`, `carousel`: These classes are often applied to style interactive sliders or carousels.
- `pagination`: It's used for styling page navigation elements.
- `user`, `author`: These classes are often used for styling user or author-related content.
- `meta`: The `meta` class is applied for styling blocks with additional information, such as tags and publication dates
  in a post.
- `cart`, `basket`: These classes are used for styling shopping cart elements.
- `breadcrumbs`: The `breadcrumbs` class is applied to style breadcrumb navigation.
- `more`, `all`: These classes are often used for styling links leading to additional information.
- `modal`: The `modal` class is used to style modal (dialog) windows.
- `popup`: It's applied for styling pop-up windows.
- `tooltip`, `tip`: These classes are used for styling tooltips.
- `preview`: The `preview` class is applied for styling teasers or previews, often found in news or blog posts,
  typically containing a title, description, and image. A link to the full version is usually provided.
- `overlay`: It's often used for styling overlay layers, such as dimming images or creating modal windows.

## States

- `active`, `current`: These classes are often used to style active or current elements, such as the current menu item.
- `visible`: The `visible` class is used for styling visible elements.
- `hidden`: It's used for styling hidden elements.
- `error`: The `error` class is applied for styling error states.
- `warning`: This class is used for styling warning states.
- `success`: Often used for styling elements indicating the successful completion of a task.
- `pending`: It's used for elements in a pending or waiting state, typically transitioning to either an error or success
  state.

## Examples of Usage

### Simple List

```html

<ul class="list">
  <li class="item">First</li>
  <li class="item">Second</li>
  <li class="item">Third</li>
</ul>
```

### User Image (User pic)

```html

<div class="user">
  <img class="user__img" src="user.png" alt="Serhii Shramko">
  <a class="user__link" href="#">Serhii Shramko</a>
</div>
```

### Gallery

```html

<div class="gallery">
  <ul class="gallery__list">
    <li class="gallery__item">
      <img class="gallery__img" src="flowers.jpg" alt="Flowers on the field">
    </li>
    <li class="gallery__item">
      <img class="gallery__img" src="trees.jpg" alt="Trees on the field">
    </li>
  </ul>
</div>
```

### Navigation

```html

<nav class="nav">
  <a class="nav__link nav__link--active">Home</a>
  <a class="nav__link" href="#">Secondary</a>
  <a class="nav__link" href="#">Third from the End</a>
  <a class="nav__link" href="#">Penultimate</a>
  <a class="nav__link" href="#">The Very End</a>
</nav>
```

You can read important information
about [difference between absolute and relative URL in HTML](/blog/difference-between-absolute-and-relative-url) because
junior developers usually makes some errors in navigation blocks.

```html

<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item nav__item--current">
      <a class="nav__link">Home</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Articles</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Photos</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Policy</a>
    </li>
  </ul>
</nav>
```

### Widget in Sidebar

```html

<div class="widget">
  <h4 class="widget__title">Jelly</h4>

  <div class="widget__content">
    <p>
      To cultivate a sociable and amiable jelly, you'll require a foam roll, two kilograms of sugar, three eggs, and
      half a cup of acetone.
    </p>

    <a class="widget__link" href="#">More.</a>
  </div>
</div>
```

### News Block

```html

<div class="news">
  <h2 class="news__title">News</h2>

  <ul class="news__list">
    <!-- Use the block class as an element class to create a new namespace -->
    <li class="news__item item-news">
      <h3 class="item-news__title">Ice Skating Competition Among Smelt Fish</h3>
      <div class="item-news__text">
        <p>The killick team from Petrozavodsk emerged victorious.</p>

        <a href="#" class="item-news__link">Read More</a>
      </div>
    </li>

    <li class="news__item item-news">
      <h4 class="item-news__title">Scientists Clarify the Role of a Nail File in Nail Care</h4>
      <div class="item-news__text">
        <p>British scientists highly rate the contribution of nail files to growing one-and-a-half-meter-long nails.</p>

        <a href="#" class="item-news__link">Don't Read More</a>
      </div>
    </li>
  </ul>
</div>
```

### Blog Article (Simple Version)

```html

<article class="article">
  <h3 class="article__title">Exploring Chakras with a Bunch of Parsley</h3>
  <time datetime="23-05-1993" class="article__datetime">May 23</time>

  <div class="article__author author-article">
    <img class="author-article__img" src="user.png" alt="Jon Wick">
    <a class="author-article__link" href="#">Jon Wick</a>
  </div>

  <div class="article__content">
    Visit the market and buy a bunch of parsley, about 100 grams. Carefully sort it out, remove bugs and caterpillars.
    Give the bugs to the cat for playtime, and let the caterpillars inhabit your cactus pot. Name one of them John and
    the other Billy, and you'll have your very own Wild West. Now, back to that bunch of parsley. Gently stroke it
    behind the ear, for yourself or your cat. Tie it with a satin ribbon, don't forget to make a bow. Congratulations!
    You now have a fully domesticated bunch of parsley that will joyfully follow you around and sprout its seeds in your
    slippers.
  </div>
</article>
```

### Blog Article (Complex Version)

```html

<article class="entry">
  <header class="entry__header">
    <h3 class="entry__title title-entry">
      <a class="title-entry__link" href="#">Rubber Ducks as a Means of Self-Discovery</a>
    </h3>

    <time class="entry__datetime">May 32, 10:87</time>
  </header>

  <div class="entry__author author-entry">
    <img class="author-entry__img" src="userpic.png" alt="Vasilisa Sergeevich">

    <a class "author-entry__link" href="#">Vasilisa Sergeevich</a>
  </div>

  <div class="entry__content">
    Retrieve a box from the attic with fifty rubber ducks left over from the New Year's celebration. Lay them out in the
    shape of a pentagram on your room's floor, using the ducks and lit candles. Sit in the middle in a lotus position,
    take a German-Portuguese dictionary in each hand, clear your throat, take a deep breath, and, with full commitment,
    exclaim, "Quack!"
  </div>

  <div class="entry__tags tags-entry">
    <h4 class="tags-entry__title">Tags</h4>

    <ul class="tags-entry__list">
      <li class="tags-entry__item">
        <a class="tags-entry__link" href="#">Handmade Round Dance</a>
      </li>
      <li class="tags-entry__item">
        <a class="tags-entry__link" href="#">Porcelain Slippers</a>
      </li>
      <li class="tags-entry__item">
        <a class="tags-entry__link" href="#">Gutalin in Cuisine</a>
      </li>
    </ul>
  </div>

  <div class="entry__actions actions-entry">
    <ul class="actions-entry__list">
      <li class="actions-entry__item actions-entry__item--read">
        <a class="actions-entry__link" href="#">200 Replies</a>
      </li>
      <li class="actions-entry__item actions-entry__item--write">
        <a class="actions-entry__link" href="#">Write to US</a>
      </li>
      <li class="actions-entry__item actions-entry__item--share">
        <a class="actions-entry__link" href="#">Share this Article</a>
      </li>
    </ul>
  </div>
</article>
```

By following the BEM methodology and using these common words in your CSS classes, you can create a structured and
maintainable codebase for your web projects.

This
approach [enhances collaboration and simplifies](http://localhost:3000/blog/class-naming-conventions#understanding-the-importance-of-html-class-naming-conventions)
the process of understanding and maintaining your stylesheets.
