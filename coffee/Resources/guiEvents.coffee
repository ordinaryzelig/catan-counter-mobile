# This is probably the wrong way to do namespaces.

gui = {
  dashboardItems: []
}

gui.updateBadges = ->
  for item in @dashboardItems
    player = game.playerByColor(item.color)
    item.badge = player[pluralize(item.componentType)].inPlay().length

# Change title of window.
gui.changeTitle = (player) ->
  window.title = player.color + ' (' + player.victoryPoints() + ')'
