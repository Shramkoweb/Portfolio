---
title: 'How I Turned 17 Hours of Video Into a Second Brain, Offline'
heading: 'From Video Course to Second Brain'
description: 'Build a second brain from video: transcribe 17 hours locally with Whisper on Apple Silicon, free and offline, then turn the text into atomic notes in Obsidian.'
createDate: 2026-09-18T09:00:00.000Z
keywords:
  [
    second brain,
    transcribe video locally,
    Whisper Mac,
    local transcription Apple Silicon,
    mlx-whisper,
    video to notes,
    Obsidian second brain,
    Zettelkasten method,
    atomic notes,
    literature note,
    YouTube video to text,
    offline AI transcription,
  ]
categories: [AI, Tools, Productivity, Opinion]
featured: true
---

<video
  src="/static/videos/obsidian-graph.mp4"
  poster="/static/images/obsidian-graph-poster.jpg"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  aria-label="The vault's graph view drawing itself: notes appear one by one and link up into a connected web"
  className="rounded-lg mt-4 mb-8 w-full h-auto"
/>

A course on pet projects sat in a folder on my Mac for weeks. 67 videos, just over 17 hours.

I knew how watching it would go. Two weeks at 1.5x, nodding along. Six months later I'd remember one anecdote and
none of the arguments.

So I didn't watch it. I transcribed the whole thing locally, offline, and built the notes by hand.

## Thirty-four minutes to transcribe 17 hours, locally and offline

If your videos aren't on disk already, [yt-dlp](https://github.com/yt-dlp/yt-dlp) handles YouTube and most of the web:

```bash
yt-dlp -f "bv*+ba/b" "https://www.youtube.com/watch?v=..."
```

[`ffmpeg`](https://ffmpeg.org) pulls the audio out at 16 kHz mono, what Whisper wants anyway:

```bash
ffmpeg -y -i input.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le out.wav
```

[whisper-large-v3-turbo](https://huggingface.co/mlx-community/whisper-large-v3-turbo) is Whisper rebuilt on Apple's MLX
framework, so it runs on the Mac's own GPU:

```bash
uvx --from mlx-whisper mlx_whisper --model mlx-community/whisper-large-v3-turbo \
  --language ru --output-format all out.wav
```

A 12-minute video came back in **20 seconds**. The full course took **34 minutes** and produced **119,808 words**.

<Image
  src="transcribe-output.png"
  alt="Terminal output listing ten course blocks, each marked done, ending with 67 files, 17h 08m of video, 119,808 words, 34 minutes"
  inverted
/>

The speed matters less than where it ran. No API key, nothing uploaded, laptop on battery. The alternative is shipping
paid course material to a service with a per-minute rate and a terms page about what it may do with your audio, which
decides whether you do it at all.

[MacWhisper](https://www.macwhisper.com/) wraps the same models in a window you drag a file onto. I stayed on the
command line because 67 files run unattended.

## Whisper writes what it hears

It transcribes sound, confidently, including sounds it has no context for. Product names take the worst of it.

The speaker said "катить в прод", ship to prod. Whisper heard "катить в рот": roll it into your mouth. Coub became
"Coop", custdev became "КАЗДЕВ", Google's Aloud became "Allowed".

<Image
  src="whisper-mishears.png"
  alt="Two columns comparing what the speaker said with what Whisper transcribed: ship it to prod became ship it into the mouth, Coub became Coop, DAU slash MAU became DAO slash MAO"
  inverted
/>

## The glossary that made things worse

Whisper has a feature for this. You pass a glossary as a prompt, text the model sees before the audio, and it should
prefer those spellings.

It fixed several names and broke other things. Punctuation drifted, sentence boundaries merged, and it invented errors
the first run didn't have: "света" (light) came back as "совета" (advice). A real word in a plausible place, so reading
won't catch it. A prompt conditions the model for the whole file, not just the words you listed.

So the glossary became a find-and-replace list applied after transcription. It changes what I tell it to change and
nothing else.

When you want an exact change, a deterministic replacement beats asking nicely. A prompt is a suggestion. A replacement
list is an instruction.

The dictionary is the only part of this that accumulates knowledge about my own material. One course recycles the same
few dozen proper nouns, so each video adds a few entries and later files come out nearly clean.

## Why I didn't dump it into Obsidian

The tempting move, and I nearly made it: drop the lot into [Obsidian](https://obsidian.md), watch the graph fill
up, call it a second brain.

**A transcript isn't atomic.** One 12-minute video held seven distinct ideas, interleaved with the speaker's biography
and a slide of his team's fishing trip. A link points at an idea, and a wall of text with the idea buried in it is
not a target.

**Copying skips the understanding.** A note is worth something because you restated the idea in your own words. A
pasted transcript is saved text that feels like saved knowledge. That gap has been
[measured](https://dtg.sites.fas.harvard.edu/DANWEGNER/pub/Sparrow%20et%20al.%202011.pdf): when people expect to have
access to information later, they recall less of the information itself and more about where it's stored.

**Spoken language doesn't survive search.** In six months I'll search "green market". The transcript says "you know,
where there's a bunch of small players and people keep hopping between them". Clear out loud, invisible to search.

Transcripts stay on disk next to the videos, where I can grep them when a note needs checking.

<Image
  src="transcript-vs-atomic-notes.png"
  alt="On the left one large note holding seven mixed ideas and links to nothing, on the right nine small numbered notes holding one idea each"
  inverted
/>

## What goes into Obsidian instead

Every source gets one note saying what it is, where the transcript sits, and what I took from it. Then come the
atomic notes: one idea each, written in my own words, linked to whatever they answer.

You don't need Obsidian for any of this. It's markdown files in folders with links between them, so the same notes
open fine in [Logseq](https://logseq.com) or anywhere else.

The part I care about most comes last: **the claims I don't buy**.

This course gave me three. He says user research is useless at launch, but that's one failed project talking. His
"green market" test never gives you a number, so you can't check it and it can't be wrong. And he only ever talks
about paid traffic, which leaves out anything that grows by word of mouth. Those aren't the products he sells to.

Skip that part and every note in your vault nods along with the source, because that's where all of them came from.
A year later you can't tell your own thinking from his.

## Tools are not ideas

The course also came with prompt sheets, a landing page checklist, method PDFs and lists of analytics tools. All
useful. None of it goes in with the notes.

A checklist is something you follow. There's nothing in it to agree or disagree with. Put one next to your idea notes
and it just sits there pretending to be an idea. Mine go in a separate Resources folder.

## How the notes get numbered

I started with [Luhmann's numbering](https://zettelkasten.de/introduction/): 1.1, 1.1a, 1.1b, 1.2 and so on. Most
explanations get it backwards. The number marks where a note sits in a line of reasoning, not where it came from in
the source.

<Image
  src="zettelkasten-numbering.png"
  alt="Diagram of Luhmann numbering: notes 1.1 to 1.4 in a horizontal chain of reasoning, with 1.1a and 1.1b branching below 1.1"
  inverted
/>

1.1 → 1.2 → 1.3 are steps of one argument, each answering the question the last left open. 1.1a goes deeper into 1.1
without breaking the chain.

Then I dropped the numbers.

They solve a paper problem: where to file a new card in a box of ninety thousand. Obsidian already knows, because it
has backlinks and search. And `[[1.1a]]` tells you nothing when you're looking at a graph, while
`[[Two halves of your concept have to line up]]` tells you the whole thing. The notes in the video at the top have no
numbers at all.

## The honest part

<Image
  src="video-to-second-brain-hero.png"
  alt="67 videos and 17 hours on the left, an arrow through Whisper taking 34 minutes offline, and 47 linked atomic notes on the right"
  inverted
/>

Thirteen hours are done. That's 47 notes, one summary per block, and a map you can read top to bottom like an
argument. Three or four notes per hour of video, and it never got faster.

The AI did 17 hours in 34 minutes, free, on my laptop, and never asked me a thing.

Without the transcripts I'd never have started. If I'd stopped there I'd have 120k words and nothing to show for them.

## Further reading

- [I Ran an AI SEO Audit on 56 Blog Posts in One Day](/blog/ai-seo-audit) — the model did the boring half, I kept the
  judgement
- [Unsubscribe from Email Newsletters Immediately](/blog/unsubscribe-immediately) — a smaller habit, same shape
