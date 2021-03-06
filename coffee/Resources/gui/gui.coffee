# This is pretty disorganized. There's plenty of gui code in view files.
# So I guess this is a general place for functions that don't belong in their own view files.

Ti.UI.setBackgroundImage(imagesPath('water.png'))

gui = {}

gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS:      1,
  BARBARIANS:   2,
}

gui.dashboardItems = {}
gui.attackStrengths = {}

gui.updateBadges = (player) ->
  for item in @dashboardItems[player.color]
    switch item.componentType
      when 'city', 'settlement'
        item.badge = player[pluralize(item.componentType)].inPlay().length
      when 'defenderOfCatanCard'
        item.badge = player.defenderOfCatanCards.length
      when 'developmentCardVictoryPoint'
        item.badge = player.developmentCardVictoryPoints.length
      when 'knights'
        item.badge = player.knightStrength()
      when 'longestRoad'
        item.badge = if player.hasLongestRoad() then 1 else 0
      when 'merchant'
        item.badge = if player.hasMerchant() then 1 else 0
      when 'metropolises'
        item.badge = player.metropolises.length
      when 'soldier'
        item.badge = player.soldiers.length

# Change title of players window.
gui.changeTitle = (player) ->
  playersWindow.title = player.color + ': ' + player.victoryPoints() + ' victory points'

gui.flexSpace = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE})

# Navigate to main tab (See gui.tabs above)
gui.navigateTo = (tab_id) ->
  @navigation.setActiveTab(tab_id)

gui.scrollTo = (index) ->
  view = @scrollableView.views[index]
  @currentPlayer = game.playerByColor(view.playerColor)
  @colorNav.index = index
  @scrollableView.scrollToView(view)
  @changeTitle(@currentPlayer)

# Reorder scrollableView and navigation tabs.
gui.reorderNavigation = (colors) ->
  reorderedTabs = reorderByColor(colors, @colorNav.labels)
  @setColorNavTabs(reorderedTabs)
  reorderedViews = reorderByColor(colors, @scrollableView.views)
  @setScrollableViews(reorderedViews)
  @scrollTo(0)

# Return colors in order they are in colorNav.
gui.colorOrder = ->
  colors = []
  for label in @colorNav.labels
    colors.push label.playerColor
  colors

gui.setScrollableViews = (newViews) ->
  @scrollableView.views = newViews

gui.setColorNavTabs = (tabs) ->
  @colorNav.labels = tabs

gui.changePlayersMenuVictoryPoints = (player) ->
  @playersTable.setData([@createPlayersTableSection()])

# Update player's victory points in game menu.
# If player is current player, change title bar too.
gui.updatePlayerVictoryPoints = (player) ->
  @changePlayersMenuVictoryPoints(player)
  @changeTitle(player) if player == gui.currentPlayer
  @checkIfPlayerHasEnoughVictoryPointsToWin(player)

gui.checkIfPlayerHasEnoughVictoryPointsToWin = (player) ->
  title = "#{player.color} has enough victory points to win"
  message = 'The official rules state that a player can only win when it is his/her turn'
  basicAlert(title, message) if player.hasEnoughVictoryPointsToWin()

gui.updateAllPlayersBadges = ->
  for player in game.players
    @updateBadges(player)

gui.updateAllPlayersVictoryPointsAndBadges = ->
  for player in game.players
    @updatePlayerVictoryPointsAndBadges(player)

gui.updatePlayerVictoryPointsAndBadges = (player) ->
  @updateBadges(player)
  @updatePlayerVictoryPoints(player)

# Create table rows for given players.
# Row contents:
#   color image
#   player color
#   badge
# badgeFunction determins badge number.
gui.createPlayersRows = (players, badgeFunction, extraFunc = ->) ->
  rows = []
  # Row for each player.
  for player in players
    row = Ti.UI.createTableViewRow({playerColor: player.color})
    # Color label image.
    colorImage = Ti.UI.createLabel
      backgroundImage: imagesPath("squares/square_#{player.color}.png")
      width: 30
      height: 30
      borderColor: 'black'
      left: 5
    row.add(colorImage)
    # Color label.
    colorLabel = Ti.UI.createLabel({
      text: player.color,
      left: 40,
      font: {
        fontSize: 20,
        fontWeight: 'bold',
      }
    })
    row.add(colorLabel)
    # Victory points badge.
    victoryPoints = badge(badgeFunction(player), {
      right: 5,
    })
    row.add(victoryPoints)
    # Add more stuff to row.
    extraFunc(player, row)
    rows.push(row)
  rows

# Game menu players table section.
gui.createPlayersTableSection = ->
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Players and scores',
    footerTitle: 'Tap Edit to remove or reorder players',
  })
  badgeFunction = (player) ->
    player.victoryPoints()
  bonusesFunction = (player, row) ->
    rightMargin = 40
    for bonus in player.bonuses()
      label = Ti.UI.createLabel
        backgroundImage: imagePathForBonus(bonus)
        width: 30
        height: 30
        right: rightMargin
      rightMargin += 35
      row.add label
  rows = @createPlayersRows(game.players, badgeFunction, bonusesFunction)
  for row in rows
    section.add(row)
  section

# Barbarians window table of player knight strength.
gui.createKnightStrengthTableSection = ->
  section = Ti.UI.createTableViewSection(
    headerTitle: 'Knight strengths',
  )
  rows = @createPlayersRows(game.playersByKnightStrength(), (player) ->
    player.knightStrength()
  )
  for row in rows
    section.add(row)
  section

gui.createNewGame = (settings) ->
  newGame(settings)
  @gameMenuWindow.setRightNavButton(editButton)
  @playersTable.moving = false
  @playersTable.data = [@createPlayersTableSection()]
  @setScrollableViews(@createPlayerViews())
  @updateAllPlayersBadges()
  @setColorNavTabs(@createColorNavTabs())
  @setExpansionTabs()
  @updateBarbariansView() if game.usesExpansion(CitiesAndKnights)
  @scrollTo(0)

# Add/remove expansion tabs.
gui.setExpansionTabs = ->
  tabExistsOnNavigation = gui.barbariansTab? && gui.navigation.tabs.indexOf(gui.barbariansTab) != -1
  if game.usesExpansion(CitiesAndKnights)
    gui.navigation.addTab(gui.barbariansTab) unless tabExistsOnNavigation
  else
    gui.navigation.removeTab(gui.barbariansTab) if tabExistsOnNavigation

# Set instructions for what to do with knights.
# If there are no knights, instruct to tap '+'.
# If there are knights, instruct to tap on knight.
gui.setKnightsTableSectionHeaderTitle = (tableSection, numKnights) ->
  if numKnights > 0
    tableSection.headerTitle = 'Tap on knight to perform actions.'
  else
    tableSection.headerTitle = 'Tap + to build a knight'

gui.removeKnightRow = (knight) ->
  gui.knightsTableSection.remove(knight.row)
  gui.knightsTable.data = [gui.knightsTableSection]

gui.updateAttackStrengths = ->
  @attackStrengths['barbarians'].text = game.barbarians.strength()
  @attackStrengths['catan'].text = game.catanDefense.strength()

gui.updateKnightStrengths = ->
  @knightStrengthTable.setData([gui.createKnightStrengthTableSection()])

gui.updateBarbariansView = ->
  @updateAttackStrengths()
  @updateKnightStrengths()
