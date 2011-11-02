# This is probably the wrong way to do namespacing.
# Plus this is pretty disorganized. There's plenty of gui code in view files.
# So I guess this is a general place for functions that don't belong in their own view files.

Ti.UI.setBackgroundImage(imagesPath('water.png'))

gui = {}

Ti.include('/gui/views/newGameWindow.js')

gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1,
}

gui.dashboardItems = {}
gui.updateBadges = (player) ->
  for item in @dashboardItems[player.color]
    switch item.componentType
      when 'settlement', 'city'
        item.badge = player[pluralize(item.componentType)].inPlay().length
      when 'longestRoad'
        item.badge = if player.hasLongestRoad() then 1 else 0
      when 'soldier'
        item.badge = player.soldiers.length
      when 'developmentCardVictoryPoint'
        item.badge = player.developmentCardVictoryPoints.length
      when 'knights'
        item.badge = player.knightStrength()

# Change title of players window.
gui.changeTitle = (player) ->
  playersWindow.title = player.color + ': ' + player.victoryPoints() + ' victory points'

gui.flexSpace = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE})

gui.navigateTo = (tab_id) ->
  @navigation.setActiveTab(tab_id)

# TODO: use color instead of index.
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
  for row in @playersTable.data[0].rows
    if row.playerColor == player.color
      row.children[2].text = player.victoryPoints()

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

gui.updatePlayerVictoryPointsAndBadges = (player) ->
  @updateBadges(player)
  @updatePlayerVictoryPoints(player)

gui.createPlayersRows = ->
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Players and scores',
    footerTitle: 'Tap Edit to remove or reorder players',
  })
  # Row for each player.
  for player in game.players
    row = Ti.UI.createTableViewRow({playerColor: player.color})
    # Color label image.
    colorImage = Ti.UI.createLabel({
      backgroundImage: 'images/square_' + player.color + '.png',
      width: 30,
      height: 30,
      borderColor: 'black',
      left: 5,
    })
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
    victoryPoints = badge(player.victoryPoints(), {
      right: 5,
    })
    row.add(victoryPoints)
    section.add(row)
  section

gui.createNewGame = (settings) ->
  @gameMenuWindow.setRightNavButton(editButton)
  @playersTable.moving = false
  controller.newGame(settings)
  @playersTable.data = [@createPlayersRows()]
  @setScrollableViews(@createPlayerViews())
  @setColorNavTabs(@createColorNavTabs())
  @scrollTo(0)

gui.setKnightsTableSectionHeaderTitle = (tableSection, numKnights) ->
  if numKnights > 0
    tableSection.headerTitle = 'Tap on knight to perform actions.'
  else
    tableSection.headerTitle = 'Tap + to build a knight'

gui.removeKnightRow = (knight) ->
  gui.knightsTableSection.remove(knight.row)
  gui.knightsTable.data = [gui.knightsTableSection]
