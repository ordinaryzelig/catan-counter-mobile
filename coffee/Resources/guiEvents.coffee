# This is probably the wrong way to do namespaces.

gui = {}

gui.dashboardItems = {}

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

gui.flexSpace = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE})

gui.navigateTo = (tab_id) ->
  @navigation.setActiveTab(tab_id)

gui.scrollTo = (index) ->
  @scrollableView.scrollToView(index)
