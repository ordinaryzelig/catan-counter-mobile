var navTab, _i, _j, _len, _len2, _ref, _ref2;
gui.navigation = Ti.UI.createTabGroup();
_ref = ['gameMenu', 'players'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  navTab = _ref[_i];
  Ti.include('/gui/views/' + navTab + '.js');
}
_ref2 = ['barbarians'];
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  navTab = _ref2[_j];
  Ti.include('/gui/views/' + navTab + '.js');
}