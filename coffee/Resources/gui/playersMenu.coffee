section = Ti.UI.createTableViewSection({
  footerTitle: 'Tap Edit to reorder players',
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

gui.playersTable = Ti.UI.createTableView({
  data: [section],
  moveable: true,
  scrollable: false,
  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
})
playerPointsWindow.add(gui.playersTable)

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

editButton = Ti.UI.createButton({
  title: 'Edit',
})
editButton.addEventListener('click', (event) ->
  playerPointsWindow.setRightNavButton(doneButton)
  gui.playersTable.moving = true
)
playerPointsWindow.setRightNavButton(editButton)

doneButton = Ti.UI.createButton({
  title: 'Done',
  style: Ti.UI.iPhone.SystemButtonStyle.DONE,
})
doneButton.addEventListener('click', (event) ->
  playerPointsWindow.setRightNavButton(editButton)
  gui.playersTable.moving = false
  newColorOrder = []
  rows = gui.playersTable.data[0].rows
  for row in rows
    newColorOrder.push(row.playerColor)
  gui.reorderNavigation(newColorOrder)
)
