# Udemy Progress Not Updating?

> Why Udemy lectures stay unchecked, why the certificate does not appear, and what "Progress cannot be changed for this item" means, with fixes from Udemy's help.

Source: https://shramko.dev/udemy-reset-progress/progress-not-updating · Author: Serhii Shramko · Published: 2026-11-05

**Short answer:** Udemy ticks a lecture once you have watched every minute of it, and it issues a certificate only when every item in the course has a checkmark. When the percentage stalls or the certificate never appears, one item is almost always missing its tick. This page shows how to find it, which checkboxes Udemy locks, and how to tick the rest.

I built [Udemy Reset Progress](https://shramko.dev/udemy-reset-progress), a free extension that clears or ticks every lecture checkbox in a course. It is my own tool, not an official Udemy one. The Udemy help articles quoted here are archived copies from 2023 to 2025, listed under Sources at the bottom, and Udemy may have changed them since.

## How Udemy marks an item complete

On the website, a video lecture is marked complete automatically "once you have watched every minute of the lecture". You can also click the checkbox next to any lecture in the course content list to tick it, and click it again to remove the tick.

Udemy Business's help spells out what the other item types need:

- **Quizzes:** every question answered, without skipping.
- **Practice tests:** a passing score.
- **Slide lectures:** every slide opened.
- **Assignments:** not needed to finish the course.

## Why your progress is not updating

- **You skipped part of a video.** Jumping ahead leaves minutes unwatched, so Udemy does not tick the lecture. Tick it by hand in the course content list.
- **A quiz or practice test is unfinished.** One skipped question, or a score below the pass mark, keeps that item open. Answer every question, or retake the test.
- **Udemy had an outage.** On 11 March 2026 Udemy reported that [lectures were not being marked complete](https://status.udemy.com/incidents/xm8whcpb5sr4) "even after watching the content fully", on Udemy.com and Udemy Business. After the fix it said some lectures watched during the incident might still show as unmarked, that it would fix them automatically, and that anyone who needs it sooner should contact support. On 30 March 2026 [reports and dashboards showed progress below 100%](https://status.udemy.com/incidents/15zlwhk27h1s) for learners who already had certificates, until 2 April. When progress stops for everyone at once, check [Udemy's status page](https://status.udemy.com/).
- **The course has no checkboxes.** Udemy is piloting [a new course experience](https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions) that leaves out the mark lecture as complete function.

## “Progress cannot be changed for this item”

Udemy's help does not mention this exact message. It does describe two kinds of checkbox that learners cannot change:

- On Udemy.com, ["assignments cannot be unmarked as complete"](https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-).
- On Udemy Business, ["lectures and course items cannot be manually marked as complete, and checkboxes cannot be manually adjusted"](https://web.archive.org/web/20230928232926/https://business-support.udemy.com/hc/en-us/articles/13302587726615). The same article says to move your cursor away if a popup message appears next to the checkbox.

If the message appears on one of these items, Udemy has locked the checkbox. Clicking it again, by hand or with an extension, will not change it. Finish the item the usual way: watch the video to the end, answer every quiz question or pass the practice test.

## Certificate of completion not showing

Udemy's [certificate FAQ](https://web.archive.org/web/20251007155453/https://support.udemy.com/hc/en-us/articles/14291607637015-Certificates-of-Completion-Frequently-Asked-Questions) is direct: "To receive your certificate of completion, each curriculum item must be marked as complete." The order does not matter, and Role Play exercises are not required.

1. Open the course content list and look for any item without a checkmark, quizzes and practice tests included.
2. Once every item is ticked, the trophy above the course player changes colour. Click it to see the certificate.
3. If the trophy has changed but no certificate shows, Udemy asks you to wait up to an hour, then refresh the certificate page or clear your cache and cookies.

Some courses never get one: "Currently only paid, approved courses offer a certificate of completion. Free courses and courses that only include practice tests do not offer a certificate of completion." Free enrolments made before 17 March 2020 keep theirs. If you retake a course, the certificate keeps the date you first completed it, unless the course adds new lectures and you complete those too.

Udemy also [notes](https://web.archive.org/web/20231004142042/https://support.udemy.com/hc/en-us/articles/229603868-How-to-Download-Your-Certificate-of-Completion-on-a-Browser-%22) that it is not an accredited institution, so its certificates cannot be used for formal accreditation.

## How to mark a Udemy course as complete

There is no button for the whole course. Udemy's help describes clicking each empty checkbox in the course content list, section by section, and a long course means hundreds of clicks.

Udemy Reset Progress makes those clicks for you. Open the course player with the course content list on screen, click the extension icon, then **Mark All Complete**. It ticks every box that is still empty and waits between clicks so Udemy is less likely to end your session. It is meant for lectures you have finished that Udemy did not tick, such as ones watched during the March 2026 outage.

It clicks the same checkboxes you can click yourself, so items Udemy locks, such as assignments, stay as they are. Udemy's [Terms of Use](https://www.udemy.com/terms/terms-of-use/) do not allow "automated means of any kind to access the Services". They do not mention browser extensions, and if that worries you, tick the boxes by hand.

- [Udemy Reset Progress on Chrome Web Store](https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-progress-not-updating)
- [Udemy Reset Progress on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/udemy-reset-progress/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-progress-not-updating)
- [Udemy Reset Progress on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/udemy-reset-progress/cmnolghflighmmfpdkinlbmoelfgchhc?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-progress-not-updating)

## Resetting progress on Udemy Business

Udemy Business's help says its checkboxes cannot be adjusted by hand, and it describes no reset option for learners. I have not tested the extension there. On Udemy.com you can [reset a whole course by hand or in one click](https://shramko.dev/udemy-reset-progress).

## FAQ

### Why is my Udemy course progress not updating?

Usually one item is still open: a video lecture you did not watch to the end, a quiz with a skipped question, or a practice test below the pass mark. Tick finished lectures by hand in the course content list. If progress stopped for everyone at once, check status.udemy.com.

### What does "Progress cannot be changed for this item" mean on Udemy?

Udemy's help does not explain the message, but it documents two kinds of locked checkbox: assignments on Udemy.com cannot be unmarked, and on Udemy Business no checkbox can be changed by hand. Complete the item the normal way instead.

### Why don't I have a Udemy certificate after finishing a course?

Every curriculum item must be marked as complete, and only paid, approved courses offer a certificate. If the trophy above the course player has changed colour but the certificate is missing, wait up to an hour, then refresh the certificate page or clear your cache and cookies.

### Is there a button to mark a whole Udemy course as complete?

No. Udemy's help describes ticking lectures one at a time. The Mark All Complete button in the free Udemy Reset Progress extension ticks every empty checkbox in the course content list for you.

### Can I reset course progress on Udemy Business?

Udemy Business's help says its checkboxes cannot be adjusted by hand, and it describes no reset option for learners.

## Related

- [How to reset Udemy course progress, by hand or in one click](https://shramko.dev/udemy-reset-progress)
- [Udemy Reset Progress not working? Fixes for every error](https://shramko.dev/udemy-reset-progress/troubleshooting)

## Sources

- [Udemy: How to mark or unmark lectures as complete (archived 2023)](https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-)
- [Udemy Business: completing lectures and course items (archived 2023)](https://web.archive.org/web/20230928232926/https://business-support.udemy.com/hc/en-us/articles/13302587726615)
- [Udemy: Certificates of completion FAQ (archived 2025)](https://web.archive.org/web/20251007155453/https://support.udemy.com/hc/en-us/articles/14291607637015-Certificates-of-Completion-Frequently-Asked-Questions)
- [Udemy: How to download your certificate of completion (archived 2023)](https://web.archive.org/web/20231004142042/https://support.udemy.com/hc/en-us/articles/229603868-How-to-Download-Your-Certificate-of-Completion-on-a-Browser-%22)
- [Udemy status: lectures unable to be marked as completed (11 March 2026)](https://status.udemy.com/incidents/xm8whcpb5sr4)
- [Udemy status: course completion ratio not updated (30 March 2026)](https://status.udemy.com/incidents/15zlwhk27h1s)
