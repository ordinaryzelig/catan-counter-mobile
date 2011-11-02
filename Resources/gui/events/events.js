var events, file, files, _i, _len;
events = {};
files = ['componentClick', 'settlementClick', 'cityClick', 'longestRoadClick', 'soldierClick', 'developmentCardVictoryPointClick', 'knightsClick', 'knightClick', 'knightDesertClick'];
for (_i = 0, _len = files.length; _i < _len; _i++) {
  file = files[_i];
  Ti.include(eventsPath("" + file + ".js"));
}