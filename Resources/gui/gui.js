var gui;
Ti.UI.setBackgroundImage(imagesPath('water.png'));
gui = {};
Ti.include('/gui/views/newGameWindow.js');
gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1
};
gui.dashboardItems = {};
gui.updateBadges = function(player) {
  var item, _i, _len, _ref, _results;
  _ref = this.dashboardItems[player.color];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    item = _ref[_i];
    _results.push((function() {
      switch (item.componentType) {
        case 'settlement':
        case 'city':
          return item.badge = player[pluralize(item.componentType)].inPlay().length;
        case 'longestRoad':
          return item.badge = player.hasLongestRoad() ? 1 : 0;
        case 'soldier':
          return item.badge = player.soldiers.length;
        case 'developmentCardVictoryPoint':
          return item.badge = player.developmentCardVictoryPoints.length;
        case 'knights':
          return item.badge = player.knightStrength();
      }
    })());
  }
  return _results;
};
gui.changeTitle = function(player) {
  return playersWindow.title = player.color + ': ' + player.victoryPoints() + ' victory points';
};
gui.flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
gui.navigateTo = function(tab_id) {
  return this.navigation.setActiveTab(tab_id);
};
gui.scrollTo = function(index) {
  var view;
  view = this.scrollableView.views[index];
  this.currentPlayer = game.playerByColor(view.playerColor);
  this.colorNav.index = index;
  this.scrollableView.scrollToView(view);
  return this.changeTitle(this.currentPlayer);
};
gui.reorderNavigation = function(colors) {
  var reorderedTabs, reorderedViews;
  reorderedTabs = reorderByColor(colors, this.colorNav.labels);
  this.setColorNavTabs(reorderedTabs);
  reorderedViews = reorderByColor(colors, this.scrollableView.views);
  this.setScrollableViews(reorderedViews);
  return this.scrollTo(0);
};
gui.colorOrder = function() {
  var colors, label, _i, _len, _ref;
  colors = [];
  _ref = this.colorNav.labels;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    label = _ref[_i];
    colors.push(label.playerColor);
  }
  return colors;
};
gui.setScrollableViews = function(newViews) {
  return this.scrollableView.views = newViews;
};
gui.setColorNavTabs = function(tabs) {
  return this.colorNav.labels = tabs;
};
gui.changePlayersMenuVictoryPoints = function(player) {
  var row, _i, _len, _ref, _results;
  _ref = this.playersTable.data[0].rows;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    row = _ref[_i];
    _results.push(row.playerColor === player.color ? row.children[2].text = player.victoryPoints() : void 0);
  }
  return _results;
};
gui.updatePlayerVictoryPoints = function(player) {
  this.changePlayersMenuVictoryPoints(player);
  if (player === gui.currentPlayer) {
    this.changeTitle(player);
  }
  return this.checkIfPlayerHasEnoughVictoryPointsToWin(player);
};
gui.checkIfPlayerHasEnoughVictoryPointsToWin = function(player) {
  var message, title;
  title = "" + player.color + " has enough victory points to win";
  message = 'The official rules state that a player can only win when it is his/her turn';
  if (player.hasEnoughVictoryPointsToWin()) {
    return basicAlert(title, message);
  }
};
gui.updatePlayerVictoryPointsAndBadges = function(player) {
  this.updateBadges(player);
  return this.updatePlayerVictoryPoints(player);
};
gui.createPlayersRows = function() {
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
gui.createNewGame = function(settings) {
  this.gameMenuWindow.setRightNavButton(editButton);
  this.playersTable.moving = false;
  controller.newGame(settings);
  this.playersTable.data = [this.createPlayersRows()];
  this.setScrollableViews(this.createPlayerViews());
  this.setColorNavTabs(this.createColorNavTabs());
  return this.scrollTo(0);
};
gui.setKnightsTableSectionHeaderTitle = function(tableSection, numKnights) {
  if (numKnights > 0) {
    return tableSection.headerTitle = 'Tap on knight to perform actions.';
  } else {
    return tableSection.headerTitle = 'Tap + to build a knight';
  }
};
gui.removeKnightRow = function(knight) {
  gui.knightsTableSection.remove(knight.row);
  return gui.knightsTable.data = [gui.knightsTableSection];
};