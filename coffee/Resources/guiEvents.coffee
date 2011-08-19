# This is probably the wrong way to do namespaces.

gui = {
  dashboardItems: {}
}

gui.updateBadges = (player) ->
  for item in @dashboardItems[player.color]
    item.badge = player[pluralize(item.componentType)].inPlay().length

# Change title of window.
gui.changeTitle = (player) ->
  window.title = player.color + ' (' + player.victoryPoints() + ')'

gui.flexSpace = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE})
