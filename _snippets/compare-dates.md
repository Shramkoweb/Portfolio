---
title: "How to Compare Dates in JavaScript: Check Date Ranges Easily"
heading: Check if date is between two dates
description: Checks if a date is between two other dates with code examples
createDate: 2023-03-05T21:57:31.886Z
keywords: [JS snippet, JS Date Snippet, check if date is between two dates, date getTime method, getTime JS]
---

Working with dates is an essential part of web development. At some point, you may need to check if a given date falls
between two other dates. In this article, we will explore how to accomplish this task using JavaScript.

There are a few different approaches to checking if a date is between two other dates, but we will focus on the most
straightforward method using the built-in Date object and its `getTime()` method. The `getTime()` method returns the
number of milliseconds since **January 1, 1970**, which is also known as
the [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time).

Let's start with a simple example:

```javascript
const date = new Date('2022-02-20');
const startDate = new Date('2022-01-01');
const endDate = new Date('2022-12-31');

if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
  console.log('The date falls between the start and end dates.');
} else {
  console.log('The date does not fall between the start and end dates.');
}
```

In this example, we first create a new Date object for the date we want to check **2022-02-20**. We then create new
Date objects for the start and end dates **2022-01-01** and **2022-12-31**, respectively.

We then use the `getTime()` method to compare the timestamps of each date. If the timestamp of the date we want to check
falls between the timestamps of the start and end dates, we log a message indicating that the date falls between the
start and end dates. Otherwise, we log a message indicating that the date does not fall between the start and end dates.

It's worth noting that the `Date` object can parse a wide variety of date formats, so you can use this method with dates
in any format that the Date object can parse.

You can also simplify the above code:

```javascript
if (startDate <= date && date <= endDate) {
  console.log('The date falls between the start and end dates.');
} else {
  console.log('The date does not fall between the start and end dates.');
}
```

In this example, we simply check if startDate is less than or equal to date AND date is less than or equal to endDate.
If both conditions are true, we log a message indicating that the date falls between the start and end dates. Otherwise,
we log a message indicating that the date does not fall between the start and end dates.

## Refactor to function

```javascript
const isBetweenDates = (startDate, endDate, date) => {
  return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
}
```

```javascript:RESULT
isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 19)
); // false

isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 25)
); // true
```

## Conclusion

Checking if a date falls between two other dates in JavaScript is a straightforward process using the
`Date` object and its `getTime()` method. By comparing the timestamps of the dates, you can easily determine whether a
given date falls between two other dates.
