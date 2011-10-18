var file, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
_ref = ['buildable', 'arrayFilters'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  file = _ref[_i];
  Ti.include('lib/' + file + '.js');
}
_ref2 = ['citiesAndKnights'];
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  file = _ref2[_j];
  Ti.include('models/expansions/' + file + '.js');
}
_ref3 = ['city', 'game', 'largestArmy', 'longestRoad', 'player', 'settlement', 'soldier', 'developmentCardVictoryPoint', 'gameSettings', 'knight'];
for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
  file = _ref3[_k];
  Ti.include('models/' + file + '.js');
}