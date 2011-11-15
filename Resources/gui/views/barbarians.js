var edgeMargin, matchup, matchupHeaderView;
gui.barbariansWindow = Ti.UI.createWindow({
  title: 'Homeland Security'
});
gui.barbariansTab = Ti.UI.createTab({
  window: gui.barbariansWindow,
  icon: tabsPath('barbarians.png'),
  title: 'Barbarians'
});
matchupHeaderView = Ti.UI.createView({
  height: 80
});
matchup = {};
edgeMargin = 20;
matchup.barbarians = createBarbariansAttackTeamView('barbarians', {
  left: edgeMargin
});
matchup.catan = createBarbariansAttackTeamView('catan', {
  right: edgeMargin
});
matchupHeaderView.add(matchup.barbarians);
matchupHeaderView.add(matchup.catan);
gui.knightStrengthTable = Ti.UI.createTableView({
  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
  headerView: matchupHeaderView
});
gui.updateKnightStrengths();
gui.knightStrengthTable.addEventListener('click', function(event) {
  var player;
  player = game.playerByColor(event.row.playerColor);
  return events.knightsClick(player);
});
gui.barbariansWindow.add(gui.knightStrengthTable);