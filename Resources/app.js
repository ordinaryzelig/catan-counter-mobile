var colors, game, player, _i, _len, _ref;
Ti.include('init.js');
Ti.include('helpers.js');
Titanium.UI.setBackgroundColor('#aaa');
colors = ['red', 'blue', 'orange', 'white', 'green', 'brown'];
game = new Game();
game.setup({
  numPlayers: colors.length
});
_ref = game.players;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  player = _ref[_i];
  player.color = colors[game.players.indexOf(player)];
  player.buildCity();
  player.buildSettlement();
}
Ti.include('navigation.js');
Ti.include('players.js');