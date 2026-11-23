---
title: How to Reset Udemy Course Progress
description: Udemy has no button that resets a whole course. Uncheck lectures one by one, or clear every checkbox in one click with Udemy Reset Progress, a free, open-source extension for Chrome, Firefox and Edge.
---

**Short answer:** Udemy has no button that resets a whole course. Its help center only describes unchecking lectures one at a time in the course content list. That is fine for a short course and slow for a long one. **Udemy Reset Progress** is a free, open-source browser extension that clears every lecture checkbox in one click.

<StoreRating app="udemy-reset-progress" />

- **Price:** free, no ads.
- **Browsers:** Chrome, Firefox and Microsoft Edge.
- **How it works:** it clicks the same lecture checkboxes you would, in the tab you have open, and makes no Udemy API calls.
- **Privacy:** it collects no data, keeps its settings in your browser and makes no network requests of its own.
- **Source:** open source under AGPL-3.0, [on GitHub](https://github.com/Shramkoweb/udemy-reset-progress).
- **Made by:** Serhii Shramko. It is an independent extension, not affiliated with or endorsed by Udemy.

<InstallLinks app="udemy-reset-progress" campaign="udemy-reset-progress" />

## How it works

### 1. Install the extension

Install Udemy Reset Progress from the Chrome Web Store, Firefox Add-ons or Microsoft Edge Add-ons. The links are above.

### 2. Open the course player

Open the course you want to reset in the course player, the page where lectures play, and make sure the course content list is on screen.

### 3. Clear the progress

Click the extension icon in your browser toolbar, then **Clear Progress**. The button reads "Resetting..." while it works. Keep the tab open until it says "Done". If it says "Try Again", the [troubleshooting page](/udemy-reset-progress/troubleshooting) explains the message.

### 4. Reload the page

Reload the course page to see the result. Every lecture checkbox is now clear.

## Features

- **One-click reset:** the popup clears every lecture checkbox in the course content list.
- **Mark all complete:** a second button ticks every box that is still unchecked.
- **Speed modes:** slow down on long courses so Udemy is less likely to end your session.
- **Any enrolled course:** it works on any course you are enrolled in that shows lecture checkboxes.
- **Private:** it collects no data, keeps its settings in your browser and makes no network requests of its own.
- **Free:** it costs nothing, has no ads and works in Chrome, Firefox and Edge.
- **Open source:** the code is on GitHub under the AGPL-3.0 license.

## Reset progress by hand

This is the only method Udemy's help describes, and it needs no extension:

1. Open the course player.
2. Find the course content list on the right-hand side.
3. Click the checkmark beside each completed lecture to remove it.

Udemy marks a lecture complete on its own once you have watched every minute of it, so the checkmarks come back as you rewatch. Its help also notes that assignments cannot be unmarked as complete ([archived Udemy help article](https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-)).

If lectures do not get their checkmark, or the certificate does not appear after you finish, see [why Udemy progress is not updating](/udemy-reset-progress/progress-not-updating).

## Speed modes

The extension clicks the same checkboxes you would, one after another. Clicking hundreds of them in a few seconds can end your Udemy session, so it waits between clicks and pauses after every batch. Open the settings with the gear button in the popup, turn off **Auto** and pick a mode:

<UdemyPacingModes />

Auto is on by default and uses the Balanced timing. It does not adapt to the size of the course. Open **Advanced** to set the Action delay, from 50 to 1000 ms, and the Batch size, from 5 to 50, yourself.

If Udemy logs you out halfway, log back in and run it again in Safe mode. The extension does not retry, but a second run continues with the boxes that are still checked. The [troubleshooting page](/udemy-reset-progress/troubleshooting) covers that and every error message.

## Mark a course complete

The popup also has a **Mark All Complete** button, which ticks every unchecked box. Udemy issues a certificate of completion for a paid course once every curriculum item is complete ([Udemy help](https://success.udemy.com/s/article/229603868)), and that certificate says you completed the course. Use the button for material you have already worked through, not to skip a course.

## Limitations

- **It needs the course content list.** If the popup says "Open a Udemy course page first", open the course player and make sure the list is on screen.
- **Udemy's new course experience.** Udemy is piloting a new course experience without the "mark lecture as complete" function ([archived Udemy FAQ](https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions)). Courses in it have no checkbox to clear, by hand or with the extension.
- **Udemy Business.** It most likely cannot change anything there. Udemy Business's help says "checkboxes cannot be manually adjusted" ([archived Udemy Business help](https://web.archive.org/web/20230928232926/https://business-support.udemy.com/hc/en-us/articles/13302587726615)), and I have not tested the extension on it.
- **No retries.** It does not retry or check what Udemy saved. Reload the course page to see the result, and run it again if anything is still checked.

## Technical details

- **Framework:** [WXT](https://wxt.dev/)
- **UI:** [SolidJS](https://www.solidjs.com/) + [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build:** [Vite](https://vite.dev/)
- **License:** [AGPL-3.0, source on GitHub](https://github.com/Shramkoweb/udemy-reset-progress)

## FAQ

### Is there a built-in way to reset progress on Udemy?

No. As of October 2026, Udemy's help describes only unchecking lectures one by one.

### Is this extension safe to use?

It runs only when you press a button in its popup, and only on the tab you have open. It keeps its settings in your browser and makes no network requests of its own.

### Will this affect my Udemy account?

It clicks the same checkboxes you can click by hand. Udemy's [Terms of Use](https://www.udemy.com/terms/terms-of-use/) do not allow "automated means of any kind to access the Services" and let Udemy restrict accounts that break them. They do not mention browser extensions, and Udemy has not said how it treats one like this. If that worries you, uncheck lectures by hand.

### Does it work in the Udemy mobile app?

No. It is a browser extension, so it works on the Udemy website in Chrome, Firefox or Edge.

### Can I use it on other learning platforms?

No. It is built for the Udemy interface and works only on Udemy.

### Is this an official Udemy tool?

No. It is an independent extension I built, and it is not affiliated with or endorsed by Udemy.

## Install Udemy Reset Progress

It is free for Chrome, Firefox and Edge.

<InstallLinks app="udemy-reset-progress" campaign="udemy-reset-progress" />

The code is open source under AGPL-3.0. [View it on GitHub](https://github.com/Shramkoweb/udemy-reset-progress).
