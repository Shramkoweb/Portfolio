# Udemy Reset Progress Not Working?

> What each Udemy Reset Progress error means and how to fix it, including a missing course content list, logouts on long courses, boxes that stay checked, and courses with no checkboxes.

Source: https://shramko.dev/udemy-reset-progress/troubleshooting · Author: Serhii Shramko · Published: 2026-10-16 · Updated: 2026-11-05

[Udemy Reset Progress](https://shramko.dev/udemy-reset-progress) does one thing: it clicks the lecture checkboxes in the course content list of the page you have open. Almost every problem comes from that list not being where the extension expects it, or from Udemy ending the session. It is my own extension, not an official Udemy tool, and I wrote this page for version 2.1.2. Find your message or symptom below.

| Message or symptom                                                    | Fix                                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| "Open a Udemy course page first"                                      | Open the course player with the course content list on screen           |
| "No course sections found on this page"                               | Wait for the course content to load, or reload, then try again          |
| "Make sure you're on a Udemy page" or "Cannot access the current tab" | Switch to the tab with your Udemy course                                |
| Logged out halfway through                                            | Log back in, switch to Safe mode and run it again                       |
| Some lectures are still checked                                       | Run it again                                                            |
| No checkboxes in the course                                           | The course is in Udemy's new course experience, which has none to clear |

## “Open a Udemy course page first”

The extension could not find the course content list. Open the course player, the page where lectures play, and make sure the course content list is on screen. Then open the popup again. If the player shows no checkboxes at all, the course may be in [Udemy's new course experience](https://shramko.dev/udemy-reset-progress/troubleshooting#no-checkboxes).

## “No course sections found on this page”

The list is there, but it has no sections the extension can open, usually because it has not finished loading. Wait for the course content to appear, reload the page if it does not, and try again.

## “Make sure you're on a Udemy page” or “Cannot access the current tab”

The browser did not let the extension into the tab. Browsers block extensions on their own pages, such as settings, the new tab page and the extension stores. Switch to the tab with your Udemy course and open the popup again.

## Udemy logged me out halfway through

On a long course, hundreds of quick clicks can end your Udemy session. Udemy does not document a limit, and the extension does not retry, so the run stops where the session ended.

1. Log back in and reload the course player.
2. Open the settings with the gear button in the popup, turn off Auto and choose Safe. To go slower still, open Advanced and raise Action delay or lower Batch size.
3. Run "Clear Progress" again. It only clicks boxes that are still checked, so it carries on where it stopped.

Speed modes in version 2.1.2:

| Mode | Between clicks | Pause | Pause length |
| --- | --- | --- | --- |
| Turbo | 100 ms | No pause | - |
| Balanced | 250 ms | Every 30 clicks | 1.5 s |
| Safe | 400 ms | Every 20 clicks | 3 s |
| Auto (default) | 250 ms | Every 30 clicks | 1.5 s |
| Advanced | 50 to 1000 ms | Every 5 to 50 clicks | Six delays, at least 1 s |

Auto currently uses the same settings as Balanced. It does not adapt to the length of the course.

## Some lectures are still checked

- Run it again. The extension collects the course sections once, when it starts, so sections that appear later are skipped on the first run and picked up on the second.
- If Udemy logged you out during the run, the clicks after that point were not saved. Log back in, reload and run it again.
- Assignments cannot be unmarked as complete, according to [Udemy's help](https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-).

## There are no checkboxes in the course

Udemy is piloting a new course experience, and [its FAQ](https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions) says the mark lecture as complete function is not included in it. Without checkboxes there is nothing to clear, by hand or with the extension.

## Udemy Business

Udemy Business's [help](https://web.archive.org/web/20230928232926/https://business-support.udemy.com/hc/en-us/articles/13302587726615) says that there "lectures and course items cannot be manually marked as complete, and checkboxes cannot be manually adjusted". The extension clicks those same checkboxes, so it most likely cannot change them either. I have not tested it on Udemy Business. Locked checkboxes and the "Progress cannot be changed for this item" message are covered in [why Udemy progress is not updating](https://shramko.dev/udemy-reset-progress/progress-not-updating).

## Still stuck?

[Open an issue on GitHub](https://github.com/Shramkoweb/udemy-reset-progress/issues) with the message you see, your browser and the mode you used. Not installed yet? The extension is free:

- [Udemy Reset Progress on Chrome Web Store](https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-troubleshooting)
- [Udemy Reset Progress on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/udemy-reset-progress/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-troubleshooting)
- [Udemy Reset Progress on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/udemy-reset-progress/cmnolghflighmmfpdkinlbmoelfgchhc?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=udemy-troubleshooting)

## Related

- [How to reset Udemy course progress, by hand or in one click](https://shramko.dev/udemy-reset-progress)
- [Udemy progress not updating? Lectures, certificates and locked checkboxes](https://shramko.dev/udemy-reset-progress/progress-not-updating)
