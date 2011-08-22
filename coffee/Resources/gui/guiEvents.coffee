# This is probably the wrong way to do namespaces.

gui = {}

gui.dashboardItems = {}

gui.currentPlayer = null

gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1,
}

gui.updateBadges = (player) ->
  for item in @dashboardItems[player.color]
    item.badge = player[pluralize(item.componentType)].inPlay().length

# Change title of players window.
gui.changeTitle = (player) ->
  playersWindow.title = player.color + ' (' + player.victoryPoints() + ')'

gui.flexSpace = Ti.UI.createButton({systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE})

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
  reorderedViews = reorderByColor(colors, @scrollableView.views)
  # Remove all views, then add reorderedViews back.
  for view in @scrollableView.views
    @scrollableView.removeView(view)
  for view in reorderedViews
    @scrollableView.addView(view)
  # Reassign tabs to colorNav.
  reorderedTabs = reorderByColor(colors, @colorNav.labels)
  @colorNav.labels = reorderedTabs

# Update player's victory points in title bar and players menu.
gui.updatePlayerVictoryPoints = (player) ->
  @changePlayersMenuVictoryPoints(player)
  @changeTitle(player)

gui.changePlayersMenuVictoryPoints = (player) ->
  for row in @playersTable.data[0].rows
    if row.playerColor == player.color
      row.children[2].text = player.victoryPoints()
