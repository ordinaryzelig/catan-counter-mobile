var createPlayersRows, doneButton, editButton, gameMenuWindow, resetGameButton, tab;
gameMenuWindow = Ti.UI.createWindow({
  title: 'Game'
});
tab = Ti.UI.createTab({
  window: gameMenuWindow,
  icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS
});
gui.navigation.addTab(tab);
createPlayersRows = function() {
  var colorImage, colorLabel, player, row, section, victoryPoints, _i, _len, _ref;
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Players and scores',
    footerTitle: 'Tap Edit to remove or reorder players'
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
  return section;
};
gui.playersTable = Ti.UI.createTableView({
  data: [createPlayersRows()],
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
  var color, player;
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
  var newColorOrder, row, rows, _i, _len;
  gameMenuWindow.setRightNavButton(editButton);
  gui.playersTable.moving = false;
  newColorOrder = [];
  rows = gui.playersTable.data[0].rows;
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    row = rows[_i];
    newColorOrder.push(row.playerColor);
  }
  return gui.reorderNavigation(newColorOrder);
});
resetGameButton = Ti.UI.createButton({
  title: 'Reset game'
});
resetGameButton.addEventListener('click', function(event) {
  gameMenuWindow.setRightNavButton(editButton);
  gui.playersTable.moving = false;
  controller.resetGame();
  gui.playersTable.data = [createPlayersRows()];
  gui.setScrollableViews(createPlayerViews());
  gui.setColorNavTabs(createColorNavTabs());
  return gui.scrollTo(0);
});
gameMenuWindow.setLeftNavButton(resetGameButton);