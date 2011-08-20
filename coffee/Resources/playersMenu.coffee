rows = []
for player in game.players

  # Construct table row.
  row = Ti.UI.createTableViewRow()

  # Color.
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

  rows.push(row)

table = Titanium.UI.createTableView({
  data: rows,
  editable: true,
  moveable: true,
  scrollable: false,
  style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
})

playerPointsWindow.add(table)

table.addEventListener('click', (event) ->
  gui.navigateTo(gui.tabs.PLAYERS)
  gui.scrollTo(event.index)
)

# Edit button.
editButton = Titanium.UI.createButton({
  title: 'Edit',
})
editButton.addEventListener('click', (event) ->
  playerPointsWindow.setRightNavButton(doneButton)
  table.editing = true
)
playerPointsWindow.setRightNavButton(editButton)

# Done button.
doneButton = Titanium.UI.createButton({
  title: 'Done',
  style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
})
doneButton.addEventListener('click', (event) ->
  playerPointsWindow.setRightNavButton(editButton)
  table.editing = false
)
