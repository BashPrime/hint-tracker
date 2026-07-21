# Pack Structure

## Root (tracker.json)

`tracker.json` is the root/starting point of the pack. This is where you define the file paths for your layout as well as your item, location, and feature data. Other important things like the pack name, unique identifier, author(s), version, and description are also defined here.

**The application is hardcoded to look for `tracker.json` in the root of your pack.zip. If the file isn't there, or if it's incorrectly named, your pack will fail to validate.**

`tracker.json` is structured like this:

```json
{
  "schemaVersion": "<Number that lets the tracker app know how to validate your pack files>",
  "id": "<Unique string identifier, required for autosaves and state files. e.g. 'prime1-hints'>",
  "name": "<String. The pack's readable name, e.g. 'Metroid Prime Hints'>",
  "gameName": "<String. Readable name for the game the pack represents, e.g. 'Metroid Prime'>",
  "version": "<String. The pack's semantic version, required for autosaves and state files>",
  "author": "<String. The person or people that made the pack>",
  "description": "<String. Describes what's in the pack>",
  "cover": "<String. Filepath for the pack cover image. See Images for more details>",
  "items": ["<array of JSON file path strings describing your item data. See Items for more info>"],
  "locations": [
    "<array of JSON file path strings describing your location data. See Locations for more info>"
  ],
  "features": [
    "<array of JSON file path strings describing your item and location features data. See Features for more info>"
  ],
  "layout": ["<array of JSON file path strings describing your layout data. See Layout for more info>"],
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
  "features": ["<array of unique feature identifier strings (see Feature)>"]
}
```

NOTE: The features array is currently not being used in the application, but I plan on adding a feature in a later release to show any items and locations that correspond to a feature (if selected in a hint object).

### Locations

Locations are structured as an array of objects, like items, but the objects are a bit more complicated.

Location objects are organized into regions/groups that each have an array of specific locations or rooms belonging to that region. For reference:

Region:

```json
{
  "name": "<the name of the region/container>",
  "children": ["<array of locations>"]
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

NOTE: The features array is currently not being used in the application, but I plan on adding a feature in a later release to show any items and locations that correspond to a feature (if selected in a hint object).

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

The layout is a complicated part of the pack structure, so I'll do my best to break down how it works.

Layouts have two parts to them:

1. The **Layout Root** is the starting point and defines the overall column layout for your pack. Note that the column data itself isn't part of the root structure, but instead is referenced by its ID/key.
2. The **Layout Objects** are the meat of the layout. They are the groups, arrays, grids, and hints that get rendered in the application.

I took this approach so that the layout definitions could be split up into smaller chunks across multiple files, which are specified in the `tracker.json`'s `layout` array of file paths.

For instance, I define my layout root in a `layout.json`, and then break up my columns into their own `.json` files. I add their file paths into `tracker.json`, and then the application builds the layout object from all of the specified files.

#### Layout Objects

I want to clarify my usage of the phrase **Layout Object**. Layout Objects are JSON objects that can be any of the following:

- Layout Root
- Layout Array
- Layout Grid
- Layout - Unhinted Items
- Hint

### Layout Root

```json
{
  "type": "root", // this is a required string literal
  "content": [
    {
      "key": "<unique identifier referencing a layout object>",
      "type": "pointer" // this is a required string literal
    }
  ]
}
```

### Layout Array

```json
{
  "type": "array", // required string literal
  "content": [
    "<array of Layout Objects>"
  ],
  "header": "<Optional string. Adds a readable text header directly above the array content>",
  "color": "<Optional string. Changes the header text color>",
  "borderColor": "<Optional string. Adds a left border of the given color to this rendered object if provided>",
  "grow": "<Boolean. This object will stretch to take the maximum possible vertical space if set to true>",
  "gap": "<Optional number. Adds [gap] REM units of spacing between each element in this object's content array.",
  "comboboxOptions": {
    // Optional object. This sets the available combobox options for all hints that are a direct child of this object's content array.
      "item": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">],
      "location": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">]
  }
}
```

### Layout Grid

```json
{
    "type": "grid", // required string literal
    "content": [
      "<two-dimensional array of Layout Objects>"
      // looks like this:
      // {
      //   "content": [
      //      [ LayoutObject, ... ]
      //   ]
      // }
    ],
  "header": "<Optional string. Adds a readable text header directly above the array content>",
  "color": "<Optional string. Changes the header text color>",
  "borderColor": "<Optional string. Adds a left border of the given color to this rendered object if provided>",
  "grow": "<Boolean. This object will stretch to take the maximum possible vertical space if set to true>",
  "gap": "<Optional number. Adds [gap] REM units of spacing between each element in this object's content grid.",
  "comboboxOptions": {
    // Optional object. This sets the available combobox options for all hints that are a direct child of this object's content grid.
      "item": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">],
      "location": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">]
  }
}
```

### Layout - Unhinted Items

This is a unique object that allows players to write down custom hints for items and locations.

```json
{
  "type": "unhinted", // required string literal
  "header": "<Optional string. Adds a readable text header directly above the unhinted items list>",
  "color": "<Optional string. Changes the header text color>",
  "borderColor": "<Optional string. Adds a left border of the given color to this rendered object if provided>",
  "comboboxOptions": {
    // Optional object. This sets the available combobox options for any hints added.
      "item": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">],
      "location": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">]
  }
}
```

### Layout - Hint

The whole reason for the tracker! This is where you specify your hint objects.

```json
{
    "type": "hint", // required string literal
    "name": "<String label for the hint object. Similar to an array or grid header, but renders differently than one.>",
    "code": "<Unique string identifier for the hint object. Required for autosaves and state files.>",
    "hintType": <Required string literal. This chooses if an item hint, location hint, or both are rendered. "item" | "location" | "itemAndLocation">,
    "color": "<Optional string. Changes the `name` text color>",
    "borderColor": "<Optional string. Adds a left border of the given color to this rendered object if provided>",
    "image": "<Optional filepath for an image. Displays above the name and hint inputs. See Images for more details.>",
    "comboboxOptions": {
    // Optional object. This sets the available combobox options for this hint. **This will be overridden** if this hint is in a array or grid with its own `comboboxOptions` defined.
      "item": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">],
      "location": [<optional string literal array. "items" | "locations" | "regions" | "features:item" | "features:location">]
  }
}
```

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
