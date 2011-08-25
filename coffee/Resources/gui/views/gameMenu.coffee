# Table view to create new game and manage players.
# Each player's victory points are displayed as badges for a bird's eye view of points.
# Tapping on player will take user to player's dashboard.

gameMenuWindow = Ti.UI.createWindow({
  title: 'Game',
})
tab = Ti.UI.createTab({
  window: gameMenuWindow,
  icon:   Ti.UI.iPhone.SystemIcon.BOOKMARKS
})
gui.navigation.addTab(tab)

createPlayersRows = ->
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Players and scores',
    footerTitle: 'Tap Edit to remove or reorder players',
  })
  for player in game.players
    row = Ti.UI.createTableViewRow({playerColor: player.color})
    colorImage = Ti.UI.createLabel({
      backgroundImage: 'images/square_' + player.color + '.png',
      width: 30,
      height: 30,
      borderColor: 'black',
      left: 5,
    })
    row.add(colorImage)
    colorLabel = Ti.UI.createLabel({
      text: player.color,
      left: 40,
      font: {
        fontSize: 20,
        fontWeight: 'bold',
      }
    })
    row.add(colorLabel)
    victoryPoints = badge(player.victoryPoints(), {
      right: 5,
    })
    row.add(victoryPoints)
    section.add(row)
  section

gui.playersTable = Ti.UI.createTableView({
  data: [createPlayersRows()],
  moveable: true,
  editable: true,
  scrollable: false,
  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
})

gameMenuWindow.add(gui.playersTable)

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
  game.players.remove(player)
  # colorNav and scrollableView will be changed when Done button is clicked.
)

editButton = Ti.UI.createButton({
  title: 'Edit',
})
editButton.addEventListener('click', (event) ->
  gameMenuWindow.setRightNavButton(doneButton)
  gui.playersTable.moving = true
)
gameMenuWindow.setRightNavButton(editButton)

doneButton = Ti.UI.createButton({
  title: 'Done',
  style: Ti.UI.iPhone.SystemButtonStyle.DONE,
})
# When finished editing,
# reorder the scrollableView and colorNav to match order in players table.
# If players were removed, remove them from the game as well.
doneButton.addEventListener('click', (event) ->
  gameMenuWindow.setRightNavButton(editButton)
  gui.playersTable.moving = false
  newColorOrder = []
  rows = gui.playersTable.data[0].rows
  for row in rows
    newColorOrder.push(row.playerColor)
  gui.reorderNavigation(newColorOrder)
)

resetGameButton = Ti.UI.createButton({
  title: 'Reset game'
})
# When button tapped:
#   Reset game.
#   Set new rows in players table.
#   Set new player views.
#   Set new color nav tabs.
resetGameButton.addEventListener('click', (event) ->
  gameMenuWindow.setRightNavButton(editButton)
  gui.playersTable.moving = false
  controller.resetGame()
  gui.playersTable.data = [createPlayersRows()]
  gui.setScrollableViews(createPlayerViews())
  gui.setColorNavTabs(createColorNavTabs())
  gui.scrollTo(0)
)
gameMenuWindow.setLeftNavButton(resetGameButton)
