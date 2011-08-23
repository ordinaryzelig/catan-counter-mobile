var colorImage, colorLabel, doneButton, editButton, gameMenuWindow, player, row, section, tab, victoryPoints, _i, _len, _ref;
gameMenuWindow = Ti.UI.createWindow({
  title: 'Game'
});
tab = Ti.UI.createTab({
  window: gameMenuWindow,
  icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS
});
gui.navigation.addTab(tab);
section = Ti.UI.createTableViewSection({
  headerTitle: 'Players',
  footerTitle: 'Tap Edit to reorder players'
});
_ref = game.players;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  player = _ref[_i];
  row = Ti.UI.createTableViewRow({
    playerColor: player.color
  });
  colorImage = Ti.UI.createLabel({
    backgroundImage: 'images/square_' + player.color + '.png',
    width: 30,
    height: 30,
    borderColor: 'black',
    left: 5
  });
  row.add(colorImage);
  colorLabel = Ti.UI.createLabel({
    text: player.color,
    left: 40,
    font: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  });
  row.add(colorLabel);
  victoryPoints = badge(player.victoryPoints(), {
    right: 5
  });
  row.add(victoryPoints);
  section.add(row);
}
gui.playersTable = Ti.UI.createTableView({
  data: [section],
  moveable: true,
  editable: true,
  scrollable: false,
  style: Ti.UI.iPhone.TableViewStyle.GROUPED
});
gameMenuWindow.add(gui.playersTable);
gui.playersTable.addEventListener('click', function(event) {
  var rowIndex, rows;
  gui.navigateTo(gui.tabs.PLAYERS);
  rows = gui.playersTable.data[0].rows;
  rowIndex = rows.indexOf(event.row);
  return gui.scrollTo(rowIndex);
});
gui.playersTable.addEventListener('delete', function(event) {
  var color;
  color = event.row.playerColor;
  player = game.playerByColor(event.row.playerColor);
  return game.players.remove(player);
});
editButton = Ti.UI.createButton({
  title: 'Edit'
});
editButton.addEventListener('click', function(event) {
  gameMenuWindow.setRightNavButton(doneButton);
  return gui.playersTable.moving = true;
});
gameMenuWindow.setRightNavButton(editButton);
doneButton = Ti.UI.createButton({
  title: 'Done',
  style: Ti.UI.iPhone.SystemButtonStyle.DONE
});
doneButton.addEventListener('click', function(event) {
  var newColorOrder, row, rows, _j, _len2;
  gameMenuWindow.setRightNavButton(editButton);
  gui.playersTable.moving = false;
  newColorOrder = [];
  rows = gui.playersTable.data[0].rows;
  for (_j = 0, _len2 = rows.length; _j < _len2; _j++) {
    row = rows[_j];
    newColorOrder.push(row.playerColor);
  }
  return gui.reorderNavigation(newColorOrder);
});