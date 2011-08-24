# Pluralize a string.
# Optional num argument will be used to determine if pluralization is necessary.
# E.g. 1 city instead of 1 cities.
pluralize = (str, num = null) ->
  newStr = switch str
    when 'city' then 'cities'
    else str + 's'
  if num?
    if num == 1
      "#{num} #{str}"
    else
      "#{num} #{newStr}"
  else
    newStr

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

dashboardItem = (atts) ->
  item = Ti.UI.createDashboardItem({
    image: atts['image'],
    canDelete: false,
  })
  item.componentType = atts['componentType']
  item.badge = atts['badge']
  item

# Reorder an array of objects by the given colors.
# Assumes that each colored object has playerColor attribute.
reorderByColor = (colors, coloredObjects) ->
  reordered = []
  for color in colors
    for object in coloredObjects
      if object.playerColor == color
        reordered.push object
  reordered

# Paths.

guiPath = (path) ->
  "/gui/#{path}"

viewsPath = (path) ->
  guiPath("views/#{path}")

eventsPath = (path) ->
  guiPath("events/#{path}")

imagesPath = (path) ->
  "/images/#{path}"

# Alerts.

basicAlert = (title, message) ->
  Ti.UI.createAlertDialog({
    title: title,
    message: message,
  }).show()

illegalActionAlert = (message) ->
  basicAlert "You can't do that", message

# Alert with OK and Cancel buttons.
# The latest Titanium API (showing 0.8 in top right) is wrong for this.
# The cancel property is just another attribute, nothing more.
# The last button is always visually the cancel button.
# Also, in the callback function, the event.cancel attribute simply returns the
# value set in the cancel property at alert creation.
confirmationAlert = (title, message) ->
  Ti.UI.createAlertDialog({
    title: title,
    message: message,
    buttonNames: ['OK', 'Cancel'],
    cancel: 1
  })
