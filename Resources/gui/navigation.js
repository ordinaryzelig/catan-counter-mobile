var gameMenuWindow, playersWindow, tab;
gui.navigation = Ti.UI.createTabGroup();
gameMenuWindow = Ti.UI.createWindow({
  title: 'Players'
});
tab = Ti.UI.createTab({
  window: gameMenuWindow,
  icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS
});
Ti.include('/gui/gameMenu.js');
gui.navigation.addTab(tab);
playersWindow = Ti.UI.createWindow();
tab = Ti.UI.createTab({
  window: playersWindow,
  icon: Ti.UI.iPhone.SystemIcon.CONTACTS
});
Ti.include('/gui/players.js');
gui.navigation.addTab(tab);
gui.navigateTo(gui.tabs.PLAYERS_MENU);
gui.currentPlayer = game.playerByColor(Game.COLORS[0]);
gui.navigation.open();