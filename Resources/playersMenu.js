var colorImage, colorLabel, doneButton, editButton, player, row, rows, table, victoryPoints, _i, _len, _ref;
rows = [];
_ref = game.players;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  player = _ref[_i];
  row = Ti.UI.createTableViewRow();
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
  rows.push(row);
}
table = Titanium.UI.createTableView({
  data: rows,
  editable: true,
  moveable: true,
  scrollable: false,
  style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
playerPointsWindow.add(table);
table.addEventListener('click', function(event) {
  gui.navigateTo(gui.tabs.PLAYERS);
  return gui.scrollTo(event.index);
});
editButton = Titanium.UI.createButton({
  title: 'Edit'
});
editButton.addEventListener('click', function(event) {
  playerPointsWindow.setRightNavButton(doneButton);
  return table.editing = true;
});
playerPointsWindow.setRightNavButton(editButton);
doneButton = Titanium.UI.createButton({
  title: 'Done',
  style: Titanium.UI.iPhone.SystemButtonStyle.DONE
});
doneButton.addEventListener('click', function(event) {
  playerPointsWindow.setRightNavButton(editButton);
  return table.editing = false;
});