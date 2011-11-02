events.knightsClick = function(player) {
  var addKnightButton, doneButton, knight, knightsWindow, _i, _len, _ref;
  gui.knightsTableSection = Ti.UI.createTableViewSection();
  gui.setKnightsTableSectionHeaderTitle(gui.knightsTableSection, player.knights.inPlay().length);
  _ref = player.knights.inPlay();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    knight = _ref[_i];
    gui.knightsTableSection.add(createKnightRow(knight));
  }
  gui.knightsTable = Ti.UI.createTableView({
    data: [gui.knightsTableSection],
    style: Ti.UI.iPhone.TableViewStyle.GROUPED,
    separatorColor: 'transparent',
    scrollable: false
  });
  knightsWindow = Ti.UI.createWindow({
    title: player.color + ' knights'
  });
  knightsWindow.add(gui.knightsTable);
  addKnightButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.ADD,
    playerColor: player.color
  });
  addKnightButton.addEventListener('click', function(event) {
    var row;
    player = game.playersByColor[event.source.playerColor];
    if (player.canBuildKnight()) {
      knight = player.buildKnight();
      row = createKnightRow(knight);
      gui.knightsTableSection.add(row);
      gui.knightsTable.data = [gui.knightsTableSection];
      return gui.setKnightsTableSectionHeaderTitle(gui.knightsTableSection, player.knights.inPlay().length);
    } else {
      return alert('Player has no level 1 knights to build');
    }
  });
  knightsWindow.setRightNavButton(addKnightButton);
  doneButton = Ti.UI.createButton({
    title: 'Done',
    style: Ti.UI.iPhone.SystemButtonStyle.DONE
  });
  doneButton.addEventListener('click', function() {
    return knightsWindow.close();
  });
  knightsWindow.setLeftNavButton(doneButton);
  return knightsWindow.open({
    modal: true,
    modalStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL
  });
};