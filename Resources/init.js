var file, _i, _j, _len, _len2, _ref, _ref2;
_ref = ['buildable', 'playableSet'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  file = _ref[_i];
  Ti.include('lib/' + file + '.js');
}
_ref2 = ['city', 'game', 'largestArmy', 'longestRoad', 'player', 'settlement', 'soldier', 'developmentCardVictoryPoint'];
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  file = _ref2[_j];
  Ti.include('models/' + file + '.js');
}