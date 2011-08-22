gui.navigation = Ti.UI.createTabGroup();
Ti.include('/gui/gameMenu.js');
Ti.include('/gui/players.js');
gui.navigateTo(gui.tabs.PLAYERS_MENU);
gui.currentPlayer = game.playerByColor(Game.COLORS[0]);
gui.navigation.open();