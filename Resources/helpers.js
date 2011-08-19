var currentPlayer, flexSpace, pluralize;
pluralize = function(str) {
  switch (str) {
    case 'settlement':
      return 'settlements';
    case 'city':
      return 'cities';
    default:
      return alert('no pluralization for ' + str);
  }
};
flexSpace = Titanium.UI.createButton({
  systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
currentPlayer = function() {
  return game.players[colorNav.index];
};