# This is probably the wrong way to do namespaces.

gui = {}

gui.dashboardItems = {}

gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1,
}

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

gui.updatePlayerVictoryPointsAndBadges = (player) ->
  @updateBadges(player)
  @updatePlayerVictoryPoints(player)
