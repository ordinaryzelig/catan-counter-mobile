gui.navigation = Ti.UI.createTabGroup();
Ti.include('/gui/views/gameMenu.js');
Ti.include('/gui/views/players.js');
gui.navigateTo(gui.tabs.PLAYERS_MENU);
gui.currentPlayer = game.playerByColor(Game.COLORS[0]);
gui.navigation.open();