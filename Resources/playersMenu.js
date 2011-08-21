var colorImage, colorLabel, doneButton, editButton, player, row, section, table, victoryPoints, _i, _len, _ref;
section = Ti.UI.createTableViewSection({
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
table = Titanium.UI.createTableView({
  data: [section],
  moveable: true,
  editable: true,
  scrollable: false,
  style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
playerPointsWindow.add(table);
table.addEventListener('click', function(event) {
  var rowIndex, rows;
  gui.navigateTo(gui.tabs.PLAYERS);
  rows = table.data[0].rows;
  rowIndex = rows.indexOf(event.row);
  return gui.scrollTo(rowIndex);
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
  var newColorOrder, row, rows, _j, _len2;
  playerPointsWindow.setRightNavButton(editButton);
  table.editing = false;
  newColorOrder = [];
  rows = table.data[0].rows;
  for (_j = 0, _len2 = rows.length; _j < _len2; _j++) {
    row = rows[_j];
    newColorOrder.push(row.playerColor);
  }
  return gui.reorderNavigation(newColorOrder);
});