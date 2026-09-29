---
title: 'Why Independent Developer Blogs Are Going Offline'
heading: 'Go Read a Blog'
description: Independent developer educators are losing readers and income to AI. What you can do about it, and how I block training crawlers on this blog.
createDate: 2026-09-29T12:00:00.000Z
keywords:
  [
    AI crawlers,
    block AI crawlers,
    AI training bots,
    robots.txt AI bots,
    independent blogs,
    developer education,
    support independent writers,
  ]
categories: [Opinion, AI]
featured: false
---

<Image src="blogs-going-offline.png" alt="Hand-drawn cover in two panels. 2024: a blog page read by three people, one holding a book, and the caption income: enough to live on. 2026: the same blog page with a red arrow for traffic going up, read by three robots labelled GPTBot, ClaudeBot and CCBot, and the caption income: zero" priority inverted />

My post on [expressions vs statements](/blog/expressions-statements) links to
[Axel Rauschmayer's article](https://2ality.com/2012/09/expressions-vs-statements.html) on the same topic. It's a 404
now.

In May, Axel took [2ality](https://2ality.com/) and his free online books offline. His notice says the income from his
books "went from being enough for me to live off (2024) to zero (2026)", while traffic grew past what he could afford.
"Virtually all of it comes from AI crawlers, so there is no ad income."

[Josh W. Comeau](https://bsky.app/profile/joshwcomeau.com/post/3mkxyqi3e2n2t) says the course creators he's spoken to
all see the same trend: "Revenue down 50%+. Fewer people engaging with our content. People switching to LLMs, which
slurp up all of our work and regurgitate it, without consent or compensation."

For more cases, read molily's [The death of web development education](https://molily.de/web-dev-education/).

Neither Axel nor Josh ran out of things to say. The money is drying up.

## What you can do

- Open the actual page. A chatbot summary sends the author nothing.
- Subscribe by RSS. Most blogs still have a feed. [This one does too](/feed.xml).
- Leave a comment or a reaction. It's how an author knows a human was there. This blog has three: a heart, a beer
  and a trophy.
- Buy the book or the course. Axel's books are still on [Payhip](https://payhip.com/rauschma). If your job comes
  with a learning budget, spend it on the people you learn from.
- Tell an author their post helped you. Two lines in an email will do.

<Image src="reactions-human-proof.png" alt="The heading proof a human was here above three hand-drawn reaction icons: a red heart labelled Love it, a beer mug labelled Cheers and a trophy labelled Champion. Next to them a gray robot with the note: read every post. pressed nothing." inverted />

## What I did here

I'm not closing this blog. The crawlers can leave instead.

<Image src="crawler-layers.png" alt="Diagram titled who gets in. Four requests pass three walls: robots.txt, Vercel firewall and middleware. GPTBot stays out at robots.txt. A rude crawler that ignores robots.txt gets a 403 at the middleware. ChatGPT-User, when someone asked, and Googlebot reach the post" inverted />

`robots.txt` tells AI training and scraping bots to stay out. The ones that ignore it get a 403 from the middleware,
and a few Vercel firewall rules back that up. Search engines and assistants that open a page because someone asked
still get in. Yes, ChatGPT can still read this post for you. I'd rather you read it yourself.

The code is on GitHub: [`lib/bot-blocklist`](https://github.com/Shramkoweb/Portfolio/tree/main/lib/bot-blocklist).

I haven't removed that 2ality link. His notice says the break is "hopefully temporary".

## Further reading

- [My "every programmer should know" list](/blog/useful-articles) — Axel and Josh have been on it since 2022
- [Bookmarks](/bookmarks) — more blogs, each with a line on why it's there
