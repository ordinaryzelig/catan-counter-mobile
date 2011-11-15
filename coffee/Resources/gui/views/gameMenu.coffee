# Table view to create new game and manage players.
# Each player's victory points are displayed as badges for a bird's eye view of points.
# Tapping on player will take user to player's dashboard.

Ti.include('/gui/views/newGame.js')

gui.gameMenuWindow = Ti.UI.createWindow({
  title: 'Setup/Scores',
})
tab = Ti.UI.createTab({
  window: gui.gameMenuWindow,
  icon:   tabsPath('game.png'),
  title:  'Setup/Scores'
})
gui.navigation.addTab(tab)

gui.playersTable = Ti.UI.createTableView({
  data: [gui.createPlayersTableSection()],
  moveable: true,
  editable: true,
  scrollable: false,
  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
})

gui.gameMenuWindow.add(gui.playersTable)

# When clicked, navigate to that player's board.
gui.playersTable.addEventListener('click', (event) ->
  gui.navigateTo(gui.tabs.PLAYERS)
  # event.index returns incorrect index because
  # for some reason, when adding more than 1 object
  # to the row, the indexes gets jumbled up.
  # We'll need to figure it out on our own.
  rows = gui.playersTable.data[0].rows
  rowIndex = rows.indexOf(event.row)
  gui.scrollTo(rowIndex)
)

# When player is removed from table, remove from game too.
gui.playersTable.addEventListener('delete', (event) ->
  color = event.row.playerColor
  player = game.playerByColor(event.row.playerColor)
  game.players.splice(game.players.indexOf(player), 1)
  # colorNav and scrollableView will be changed when Done button is clicked.
)

editButton = Ti.UI.createButton({
  title: 'Edit',
})
editButton.addEventListener('click', (event) ->
  gui.gameMenuWindow.setRightNavButton(doneButton)
  gui.playersTable.moving = true
)
gui.gameMenuWindow.setRightNavButton(editButton)

doneButton = Ti.UI.createButton({
  title: 'Done',
  style: Ti.UI.iPhone.SystemButtonStyle.DONE,
})
# When finished editing,
# reorder the scrollableView and colorNav to match order in players table.
# If players were removed, remove them from the game as well.
# Update Barbarians view if used.
doneButton.addEventListener('click', (event) ->
  gui.gameMenuWindow.setRightNavButton(editButton)
  gui.playersTable.moving = false
  newColorOrder = []
  rows = gui.playersTable.data[0].rows
  for row in rows
    newColorOrder.push(row.playerColor)
  gui.reorderNavigation(newColorOrder)
  gui.updateBarbariansView() if game.usesExpansion(CitiesAndKnights)
)

newGameButton = Ti.UI.createButton({
  title: 'New game'
})
# When button tapped:
#   New game.
#   Set new rows in players table.
#   Set new player views.
#   Set new color nav tabs.
newGameButton.addEventListener('click', (event) ->
  gui.showNewGameWindow()
)
gui.gameMenuWindow.setLeftNavButton(newGameButton)
