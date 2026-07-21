# Pack Structure

## Root (tracker.json)

`tracker.json` is the root/starting point of the pack. This is where you define the file paths for your layout as well as your item, location, and feature data. Other important things like the pack name, unique identifier, author(s), version, and description are also defined here.

**The application is hardcoded to look for `tracker.json` in the root of your pack.zip. If the file isn't there, or if it's incorrectly named, your pack will fail to validate.**

`tracker.json` is structured like this:

```json
{
  "schemaVersion": "<number that lets the tracker app know how to validate your pack files>",
  "id": "<unique identifier, required for autosaves and state files, e.g. 'prime1-hints'>",
  "name": "<the pack's readable name, e.g. 'Metroid Prime Hints'>",
  "gameName": "<readable name for the game the pack represents, e.g. 'Metroid Prime'>",
  "version": "<semantic version, required for autosaves and state files>",
  "author": "<the person or people that made the pack>",
  "description": "<string that describes what's in the pack>",
  "cover": "<filepath for the pack cover image>",
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

## Data

Items, locations, and Randovania-style features make up the data the application uses to build the combobox options for your hints. You have control over what combobox options are actually available for your hints, but I'll discuss that more in the Layouts section.

### Items

Items are an array of objects, structured as follows:

```json
{
  "name": "<Readable item name, e.g. Missile Launcher>",
  "code": "<unique identifier string, e.g. 'missileLauncher'>",
  "type": "<'progression', 'useful', or 'filler'>",
  "features": [
    "<array of unique feature identifier strings (see Feature)>"
  ],
}
```

### Locations

Locations are structured as an array of objects, like items, but the objects are a bit more complicated.

Location objects are organized into regions/groups that each have an array of specific locations or rooms belonging to that region. For reference:

Region:
```json
{
  "name": "<the name of the region/container>",
  "children": [
    "<array of location objects>"
  ]
}
```

Location:
```json
{
  "name": "<readable name of the location/room>"
  "features": [
    "<array of unique feature identifier strings (see Feature)>"
  ]
}
```

### Features

Features are an array of objects, structured as follows:

```json
{
  "name": "<readable name of the feature>",
  "code": "<unique identifier string, used to reference a feature by items and locations>",
  "type": "<'feature:item' or 'feature:location'>"
}
```

## Layout

to be written

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

