var events, file, files, _i, _len;
events = {};
files = ['barbariansAttackClick', 'cityClick', 'componentClick', 'developmentCardVictoryPointClick', 'knightClick', 'knightDesertClick', 'knightsClick', 'longestRoadClick', 'settlementClick', 'soldierClick'];
for (_i = 0, _len = files.length; _i < _len; _i++) {
  file = files[_i];
  Ti.include(eventsPath("" + file + ".js"));
}