---
title: "Mastering Grid Creation Using Flexbox in React: A Step-by-Step Guide"
heading: "How to create a grid with flexbox in React"
description: Creating a flexbox-based Grid component with BEM methodology and clsx
createDate: 2022-10-09T20:40:12.461Z
updateData: 2022-10-10T00:35:10.461Z
keywords: [ react flexbox grid, flexbox css, react js grid, react flexbox, react grid system, classnames, clsx ]
categories: [ React, CSS, How-To ]
featured: false
---

<Image src="grid.jpeg" alt="Don't forget to specify alt" />

Often in the life of a web developer, you need to make a grid, but the limitations of the browser (Internet Explorer 😭)
do not allow you to use, for example, [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

This is
where [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
comes to the rescue. He is our friend, brother and helper. 🫡

This post is about how to create a flexbox-based grid component in React. The component should be reusable and painless
to configure.

## Preparation

Many of those who created components in React are familiar with
the [classnames](https://www.npmjs.com/package/classnames) library, but I want to recommend you the
[clsx](https://www.npmjs.com/package/clsx) library, which is smaller and similar in functionality.

It is not necessary for our component, but it is more comfortable with them:

```shell
npm i clsx
```

## Step 1: Create React component architecture

```jsx
const Grid = ({ children }) => (
  <div className='grid'>
    {children}
  </div>
);
```

```jsx
const GridColumn = ({ children }) => (
  <div className='grid__col'>
    {children}
  </div>
);
```

```jsx
const GridRow = ({ children }) => (
  <div className='grid__row'>
    {children}
  </div>
);
```

## Step 2: Create styles with SCSS

I use the [BEM](https://en.bem.info/methodology/) methodology for styles, as I think it is excellent for component
libraries.

```scss
// Base styles
.grid {
  width: 100%;

  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__col {
    flex-grow: 1;
    flex-shrink: 0;

    // For decoration only
    background-color: #bbeffd;
    border: 1px solid #61dafb;
    padding: 15px;
    text-align: center;
    margin-bottom: 25px;
  }
}
```

What about columns logic?

```scss
.grid__row--col-3 > .grid__col {
  width: 33%;
}

.grid__row--col-2 > .grid__col {
  width: 50%;
}
```

It is so ugly. Why we need to do it manually?

Let's try some [Sass](https://sass-lang.com/documentation/at-rules/control/each/) magic 🪄?

```scss
$columnsNumberToWidth: (
  2: 50%,
  3: 33%,
  4: 25%,
  5: 20%,
  6: 16.6%,
);

@each $number, $width in $columnsNumberToWidth {
  .grid__row--col-#{$number} > .grid__col {
    width: $width;
  }
}
```

You can see how SASS code is transformed into CSS [here](https://www.sassmeister.com/):

<Image src="sass.jpeg" alt="sassmeister site screenshot" />

## Step 3: Add logic to the GridRow component.

```jsx
import clsx from 'clsx';

const GridRow = (pops) => {
  const {
    children,
    columns,
  } = props;

  const rootClasses = clsx('grid__row', {
    [`grid__row--col-${columns}`]: columns,
  });

  return (
    <div className={rootClasses}>
      {children}
    </div>
  );
};
```

## Let's check result

```jsx
<Grid>
  <GridRow columns={6}>
    <GridColumn>1 of 6</GridColumn>
    <GridColumn>2 of 6</GridColumn>
    <GridColumn>3 of 6</GridColumn>
  </GridRow>

  <GridRow columns={6}>
    <GridColumn>1 of 6</GridColumn>
    <GridColumn>2 of 6</GridColumn>
    <GridColumn>3 of 6</GridColumn>
    <GridColumn>4 of 6</GridColumn>
    <GridColumn>5 of 6</GridColumn>
    <GridColumn>6 of 6</GridColumn>
  </GridRow>

  {/* ...  */}
</Grid>
```

<Image src="example-1.jpeg" alt="First example grid screenshot" />

## Recap

Writing components has an endless process ♾.

Next, you can add a dynamic size of each column, column gaps, change the component tag type, breakpoints and so on...

Therefore, below I share additional materials that may be useful:

- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy Game](https://flexboxfroggy.com/)
- [React bootstrap Grid system](https://react-bootstrap.github.io/docs/layout/grid/)


