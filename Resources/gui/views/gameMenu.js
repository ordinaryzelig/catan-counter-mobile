var doneButton, editButton, newGameButton, tab;
gui.gameMenuWindow = Ti.UI.createWindow({
  title: 'Setup/Scores'
});
tab = Ti.UI.createTab({
  window: gui.gameMenuWindow,
  icon: tabsPath('game.png'),
  title: 'Setup/Scores'
});
gui.navigation.addTab(tab);
gui.playersTable = Ti.UI.createTableView({
  data: [gui.createPlayersRows()],
  moveable: true,
  editable: true,
  scrollable: false,
  style: Ti.UI.iPhone.TableViewStyle.GROUPED
});
gui.gameMenuWindow.add(gui.playersTable);
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
  return game.players.splice(game.players.indexOf(player), 1);
});
editButton = Ti.UI.createButton({
  title: 'Edit'
});
editButton.addEventListener('click', function(event) {
  gui.gameMenuWindow.setRightNavButton(doneButton);
  return gui.playersTable.moving = true;
});
gui.gameMenuWindow.setRightNavButton(editButton);
doneButton = Ti.UI.createButton({
  title: 'Done',
  style: Ti.UI.iPhone.SystemButtonStyle.DONE
});
doneButton.addEventListener('click', function(event) {
  var newColorOrder, row, rows, _i, _len;
  gui.gameMenuWindow.setRightNavButton(editButton);
  gui.playersTable.moving = false;
  newColorOrder = [];
  rows = gui.playersTable.data[0].rows;
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    row = rows[_i];
    newColorOrder.push(row.playerColor);
  }
  return gui.reorderNavigation(newColorOrder);
});
newGameButton = Ti.UI.createButton({
  title: 'New game'
});
newGameButton.addEventListener('click', function(event) {
  return gui.showNewGameWindow();
});
gui.gameMenuWindow.setLeftNavButton(newGameButton);