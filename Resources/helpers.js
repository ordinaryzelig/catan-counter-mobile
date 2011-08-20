var badge, currentPlayer, pluralize;
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
badge = function(text, options) {
  var attr, labelOpts, value;
  if (options == null) {
    options = {};
  }
  labelOpts = {
    text: text,
    textAlign: 'center',
    height: 25,
    width: 25,
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12.5,
    shadowColor: 'black'
  };
  for (attr in options) {
    value = options[attr];
    labelOpts[attr] = value;
  }
  return Ti.UI.createLabel(labelOpts);
};