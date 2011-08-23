pluralize = (str) ->
  switch str
    when 'settlement' then 'settlements'
    when 'city' then 'cities'

# Custom badge.
badge = (text, options = {}) ->
  labelOpts = {
    text: text,
    textAlign: 'center',
    height: 25,
    width: 25,
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12.5,
  }
  for attr, value of options
    labelOpts[attr] = value
  Ti.UI.createLabel(labelOpts)

# Reorder an array of objects by the given colors.
# Assumes that each colored object has playerColor attribute.
reorderByColor = (colors, coloredObjects) ->
  reordered = []
  for color in colors
    for object in coloredObjects
      if object.playerColor == color
        reordered.push object
  reordered

guiPath = (path) ->
  "/gui/#{path}"

viewsPath = (path) ->
  guiPath("views/#{path}")

eventsPath = (path) ->
  guiPath("events/#{path}")
