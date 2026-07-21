# BashPrime Hint Tracker

A tracker which helps organize the hints that players write down during a randomizer play session.

The following game randomizers are supported:

* Metroid Prime
* Metroid Prime 2: Echoes
* Metroid Prime 3: Corruption

![echoestracker](https://github.com/user-attachments/assets/e5bf8eb4-f0b6-4f54-a056-9cac4c9d4463)

## How To Use
- You can right-click any of the hint panels to give them a checkmark. This is useful for tracking which hints have been solved, which keys have been obtained, which bosses have been defeated, etc. You can remove the checkmark by right-clicking again.
- For the Luminoth lore hint scans, Randovania sometimes provides you with a proximity hint. You can write down the proximity/room count into the text inputs that are marked as **"in"**.
  - i.e. "The Dark Beam can be found **exactly 2 rooms** from the Missile Launcher."
- If you want to freely write down something in the item or location inputs instead of choosing an option from the popup, you can click away, press Tab, or press the Escape key.

## Installation

If you're looking to download and use the tracker, check out the [latest release](https://github.com/BashPrime/prime-hint-tracker/releases/latest).

## Build from Source

### Prerequisites

You will need `pnpm`. I recommend installing Node.js and then installing it via `corepack`:

```bash
corepack enable pnpm
```

### Instructions

#### Install the project dependencies

```bash
pnpm install
```

#### Run the tracker in development mode

```bash
pnpm run dev
```

#### VS Code Debugging

This project is configured for use with the VS Code debugger. You can launch the debugger by pressing F5.

#### Build an executable of the tracker

**NOTE**: You need to be using the operating system you intend to build for.

i.e. you must build the macOS distribution on a macOS computer.

```bash
pnpm run dist:win # Windows 64-bit
pnpm run dist:mac # macOS ARM
pnpm run dist:linux # Linux 64-bit
```
