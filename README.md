# Date Hopper
A simple plugin that adds commands to insert dates and modify dates that are under current cursor position.  Commands can be assigned to hotkeys for quick access.  

# Versions
## 1.0.0
Initial release, just getting started here.  

## 1.0.1
- Adds day of the week to the status bar when cursor in date. 

## 1.0.2
- Adds additional inserts
  - End of week / workweek
  - Start of week / workweek
- Adds settings to support selection on inserts above
- Moves to Luxon for date management (away from momentjs)
- Modularizes commands into separate file for manageabilty

## Known limiations (Future Plans)
- No support for date formats other than YYYY-MM-DD
- No support for adjusting dates when using multicursor selection.   Only the first date will update and the multi-cursor selection will be removed

