var flexSpace, pluralize;
pluralize = function(str) {
  switch (str) {
    case 'settlement':
      return 'settlements';
    case 'city':
      return 'cities';
  }
};
flexSpace = Titanium.UI.createButton({
  systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});