# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- The tracker has been completely overhauled and now functions as a universal tracker!
  - The previously-hardcoded trackers have been completely replaced by a new pack system, inspired by [PopTracker](https://github.com/black-sliver/PopTracker).
  - Tracker packs are bundled .zip files that are installed and read by the application, and then parsed to generate the resulting layout and hint structure.
  - If you want to build your own pack, please read `docs/Pack.md`.
- The hint tracker now has [a website](https://bashprime.github.io/hint-tracker)!
  - It includes a table of community-made packs that can be downloaded and installed.
- Autosaving is now done for every installed tracker pack (and every installed version of that pack), meaning that your progress in Pack A won't be lost if you switch to Pack B.
- Light theme has been added.
  - By default, the application will use the system theme, but the light or dark themes can be manually set if desired.
- Checkboxes can be made accessible by keyboard and directly interacted with by enabling the **Accessible Checkboxes** toggle.
- New toggle **Use Pack's Default Window Size on Load** that automatically resizes the window to the pack's default size (if defined) when loading it.
  - This will **not** occur if the window is maximized or in fullscreen.
- Improved error handling, including:
  - The app will tell you what pack is missing if you attempt to import a tracker state for a pack that is not installed.
- The application is better optimized for performance compared to v3.0.0.

## [3.0.0] - 2025-04-07

## Changes

- The tracker now supports the following hints for **Metroid Prime 3: Corruption**:
  - Hyper Missile scan
  - Hyper Grapple scan
  - Unhinted Items
- An installer for Windows is now included for this release (and future releases), which has considerably faster startup than the portable .exe

## [2.0.0] - 2025-04-07

- Metroid Prime hints are now supported and accounts for Artifact locations, the Phazon Suit hint, and unhinted items.
  - A new Toggles item has been added to switch between area and room name precision for the Phazon Suit hint.
- A new menu item has been added to switch the game you want to track (currently Prime and Prime 2)
  - **NOTE**: Switching games will reset the tracker session, so be sure to save your session before switching games!
- The tracker configuration schemas have been significantly overhauled, so the structure of any tracker .json files opened by the user are expected to more strictly conform to what's defined in the app.

### Metroid Prime 2

- Location featural hints have been updated to match what's in Randovania v9.0.0.
- The keybearer and translator hints are now sorted in alphabetical room order (per region).
- Related to the above tracker config note, almost all of the Prime 2-related data structures have been overhauled. I _think_ this results in a performance increase based on how I'm handling the tracker state, but will need confirmation through testing

## [1.1.0] - 2025-02-13

- Added autocomplete support for Randovania's new featural hints. The old hint options, including the proximity hints input field, can still be activated by enabling the "Legacy Hints" toggle.
  - **NOTE**: Legacy hints will be removed in a feature release, once Randovania's featural hints are pushed to a stable release build.
- The tracker session will now save and load automatically when exiting and starting the application, respectively. ([#14](https://github.com/BashPrime/prime-hint-tracker/issues/14), [#37](https://github.com/BashPrime/prime-hint-tracker/issues/37))
- New **Toggles** menu item that includes the following options:
  - Always On Top
  - Legacy Hints (see above)
  - Prime 2: selecting whether to display the Aether rooms, Dark Aether rooms, or both for each Luminoth Keybearer hint.
- You can also save and load your own tracker sessions using the "Open" and "Save As..." menu buttons.
- Clicking the **Reset Tracker** button will now show a confirmation dialog the user must accept before the reset occurs.
- Removed the ability to highlight most of the text in the app ([#20](https://github.com/BashPrime/prime-hint-tracker/issues/20))
- There's a loading screen when the app initializes and it's cool and I'm proud of it
- Added an About page ([#35](https://github.com/BashPrime/prime-hint-tracker/issues/35))

## [1.0.0] - 2025-01-07

- Added a section for tracking Sky Temple Keys.
- Added a section called **Unhinted Items** which players can use to track items of their choosing.
- All hints can now be given a checkmark/marked as check by right-clicking them.
- Keybearer hints now show their respective light and dark world room names.
- The **Reset Tracker** menu button is now functional and resets the entire tracker state when clicked.
- **Translator Hints**: The "Item" input now contains options for dark temple key hints and boss item hints.
- **Translator Hints**: Added "Major Upgrade" option.

## [0.1.1] - 2025-01-02

This release contains the following changes:

- "Joke Hint" can now be selected in Translator Hints.
- Fixed [#5](https://github.com/BashPrime/prime-hint-tracker/issues/5), [#6](https://github.com/BashPrime/prime-hint-tracker/issues/6), and [#7](https://github.com/BashPrime/prime-hint-tracker/issues/7)
- Some small layout tweaks for the boss info container

## [0.1.0] - 2025-01-02

First release of the tracker. Supports most hints for Metroid Prime 2 randomizer (except for Sky Temple Keys).

- Displays regional info for Temple Grounds, Agon Wastes, Torvus Bog, and Sanctuary Fortress.
- For each region, players can input item, region, and location info for the following:
  - Main guardian boss items
  - Dark Temple keys (non Sky Temple)
  - Flying ing cache items
  - Translator hints (including proximity info)

While it is recommended to use this tracker on high-resolution monitors, I've added responsive layouts for those working on smaller screens/higher DPI.
