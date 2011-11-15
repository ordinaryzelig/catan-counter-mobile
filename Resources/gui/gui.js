var gui;
Ti.UI.setBackgroundImage(imagesPath('water.png'));
gui = {};
gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1,
  BARBARIANS: 2
};
gui.dashboardItems = {};
gui.attackStrengths = {};
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
gui.createPlayersRows = function(players, badgeFunction) {
  var colorImage, colorLabel, player, row, rows, victoryPoints, _i, _len;
  rows = [];
  for (_i = 0, _len = players.length; _i < _len; _i++) {
    player = players[_i];
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
    victoryPoints = badge(badgeFunction(player), {
      right: 5
    });
    row.add(victoryPoints);
    rows.push(row);
  }
  return rows;
};
gui.createPlayersTableSection = function() {
  var row, rows, section, _i, _len;
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Players and scores',
    footerTitle: 'Tap Edit to remove or reorder players'
  });
  rows = this.createPlayersRows(game.players, function(player) {
    return player.victoryPoints();
  });
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    row = rows[_i];
    section.add(row);
  }
  return section;
};
gui.createKnightStrengthTableSection = function() {
  var row, rows, section, _i, _len;
  section = Ti.UI.createTableViewSection({
    headerTitle: 'Knight strengths'
  });
  rows = this.createPlayersRows(game.playersByKnightStrength(), function(player) {
    return player.knightStrength();
  });
  for (_i = 0, _len = rows.length; _i < _len; _i++) {
    row = rows[_i];
    section.add(row);
  }
  return section;
};
gui.createNewGame = function(settings) {
  this.gameMenuWindow.setRightNavButton(editButton);
  this.playersTable.moving = false;
  controller.newGame(settings);
  this.playersTable.data = [this.createPlayersTableSection()];
  this.setScrollableViews(this.createPlayerViews());
  this.setColorNavTabs(this.createColorNavTabs());
  this.setExpansionTabs();
  return this.scrollTo(0);
};
gui.setExpansionTabs = function() {
  if (game.usesExpansion(CitiesAndKnights)) {
    return gui.navigation.addTab(gui.barbariansTab);
  } else {
    return gui.navigation.removeTab(gui.barbariansTab);
  }
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
gui.updateAttackStrengths = function() {
  this.attackStrengths['barbarians'].text = game.barbarians.strength();
  return this.attackStrengths['catan'].text = game.catanDefense.strength();
};
gui.updateKnightStrengths = function() {
  return this.knightStrengthTable.setData([gui.createKnightStrengthTableSection()]);
};
gui.updateBarbariansView = function() {
  this.updateAttackStrengths();
  return this.updateKnightStrengths();
};