var currentPlayer, pluralize;
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
currentPlayer = function() {
  return game.players[colorNav.index];
};