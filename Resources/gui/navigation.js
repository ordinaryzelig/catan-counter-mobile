var playerPointsWindow, playersWindow, tab;
gui.navigation = Ti.UI.createTabGroup();
playerPointsWindow = Ti.UI.createWindow({
  title: 'Players'
});
tab = Ti.UI.createTab({
  window: playerPointsWindow,
  icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS
});
Ti.include('/gui/playersMenu.js');
gui.navigation.addTab(tab);
playersWindow = Ti.UI.createWindow();
tab = Ti.UI.createTab({
  window: playersWindow,
  icon: Ti.UI.iPhone.SystemIcon.CONTACTS
});
Ti.include('/gui/players.js');
gui.navigation.addTab(tab);
gui.navigateTo(gui.tabs.PLAYERS_MENU);
gui.navigation.open();