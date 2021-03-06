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

# Return new, reordered array of objects by the given colors.
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

tabsPath = (path) ->
  imagesPath("tabs/#{path}")

knightImagePath = (knight) ->
  path = 'knights/' + knight.player.color + '_' + knight.level
  path = path + '_activated' if knight.active
  path = path + '.png'
  imagesPath(path)

barbariansImagePath = (path) ->
  imagesPath('barbarians/' + path)

metropolisImagePath = (path) ->
  imagesPath("metropolises/#{path}")

# Given bonus object, determine what class it is and return an image path representation.
imagePathForBonus = (bonus) ->
  path = 'bonuses/'
  switch bonus.constructor
    when DefenderOfCatanCard
      imagesPath(path + 'defender_of_catan_card.png')
    when LargestArmy
      imagesPath(path + 'largest_army.png')
    when LongestRoad
      imagesPath(path + 'longest_road.png')
    when Merchant
      imagesPath(path + 'merchant.png')
    when Metropolis
      imagesPath(path + "metropolis_#{bonus.type}.png")

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

# Create a label with knight as image.
createKnightButton = (knight) ->
  Ti.UI.createButton(
    backgroundImage: knightImagePath(knight),
    playerColor: knight.player.color,
    knightId: knight.id,
    height: 60,
    width: 60,
  )

# Create table row with knight button.
createKnightRow = (knight) ->
  row = Ti.UI.createTableViewRow(
    backgroundColor: 'transparent',
    height: 60,
  )
  knightButton = createKnightButton(knight)
  knightButton.addEventListener('click', (event) ->
    button = event.source
    player = game.playerByColor(button.playerColor)
    knight = player.knights.findById(button.knightId)
    events.knightClick(knight)
  )
  knight.button = knightButton
  knight.row = row
  row.add(knightButton)
  row

# For the barbarians vs catan matchup,
# create a view for a team.
# Make image in background and strength in foreground.
createBarbariansAttackTeamView = (teamName, options) ->
  view = Ti.UI.createView(options)
  view.height = 60
  view.width  = 60
  view.backgroundImage = barbariansImagePath(teamName + '.png')
  strengthLabel = Ti.UI.createLabel(
    textAlign: 'center',
    font: {
      fontSize: 50,
      fontWeight: 'bold',
    },
  )
  gui.attackStrengths[teamName] = strengthLabel
  view.add(strengthLabel)
  view

# Create table row with metropolis button.
createMetropolisRow = (metropolisType, player) ->
  row = Ti.UI.createTableViewRow(
    backgroundColor: 'transparent',
    height: 100,
  )
  metropolisButton = createMetropolisButton(metropolisType, player)
  metropolisButton.addEventListener('click', (event) ->
    button = event.source
    player = game.playerByColor(button.playerColor)
    events.metropolisClick(metropolisType, player)
  )
  row.add(metropolisButton)
  row

# Create a label with metropolis as image.
createMetropolisButton = (metropolisType, player) ->
  Ti.UI.createButton(
    backgroundImage: metropolisImagePath("metropolis_#{metropolisType}.png"),
    playerColor: player.color,
    metropolisType: metropolisType,
    height: 100,
    width: 100,
  )

# This needs to be defined here so that CoffeeScript will treat it as
# global, and newGame() will not create a local variable.
game = null

newGame = (settings = {}) ->
  game = new Game({
    numPlayers: Game.COLORS.length,
    settings: settings,
  })
  # Assign colors.
  for player in game.players
    player.color = Game.COLORS[game.players.indexOf(player)]
