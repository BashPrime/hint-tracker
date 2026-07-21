# Pack Structure

## Root (tracker.json)

`tracker.json` is the root/starting point of the pack. This is where you define the file paths for your layout as well as your item, location, and feature data. Other important things like the pack name, unique identifier, author(s), version, and description are also defined here.

**The application is hardcoded to look for `tracker.json` in the root of your pack.zip. If the file isn't there, or if it's incorrectly namedy, your pack will fail to validate.**

`tracker.json` is structured like this:

```json
{
  "schemaVersion": "<number that lets the tracker app know how to validate your pack files>",
  "id": "<unique string for saving and loading autosaves/state files>",
  "name": "<the pack's readable name>",
  "gameName": "<readable name for the game the pack represents, e.g. Super Mario 64>",
  "version": "<semantic version, required for saving and loading autosaves/state files>",
  "author": "<the person or people that made the pack>",
  "description": "<string that describes what's in the pack>",
  "cover": "<filepath for the pack cover image (.png, .jpeg, or .webp)>",
  "items": ["<array of JSON file paths describing your item data>"],
  "locations": ["<array of JSON file paths describing your location data>"],
  "features": [
    "<array of JSON file paths describing your item and location features data>"
  ],
  "layout": ["<array of JSON file paths describing your layout data>"],
  "defaultWindowSize": {
    "width": "<number, pixel width>",
    "height": "<number, pixel height>"
  }
}
```

## Layout



## Images

Your tracker pack can display PNG, JPEG, or WEBP images. There are currently two ways that images are used:

- Displaying the pack's cover image on the home screen
- Hints in the pack layout can display images

To display an image, include it somewhere in your .zip archive and refrence it by its relative file path:

`tracker.json`:
```json
{
  "cover": "path/to/img.png"
}
```

Hint in your layout:
```json
{
  "image": "path/to/img.png"
}
```

