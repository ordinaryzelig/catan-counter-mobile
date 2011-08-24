var longestRoadClick, longestRoadEvents;
longestRoadEvents = {
  AWARD: 'Take longest road',
  CANCEL: 'Cancel'
};
longestRoadClick = function(player) {
  var dialog, key, options, previousPlayerWithLongestRoad, title, value;
  previousPlayerWithLongestRoad = game.longestRoad.player;
  options = [];
  for (key in longestRoadEvents) {
    value = longestRoadEvents[key];
    options.push(value);
  }
  title = previousPlayerWithLongestRoad != null ? "" + previousPlayerWithLongestRoad.color + " has the longest road" : '';
  dialog = Ti.UI.createOptionDialog({
    options: options,
    cancel: options.indexOf(longestRoadEvents['CANCEL']),
    title: title
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case longestRoadEvents.AWARD:
        if (player.hasLongestRoad()) {
          illegalActionAlert('Player already has longest road');
        } else {
          if (previousPlayerWithLongestRoad != null) {
            basicAlert('Longest road stolen', "Longest road was stolen from " + previousPlayerWithLongestRoad.color);
          }
          player.takeLongestRoad();
        }
        break;
      case longestRoadEvents.CANCEL:
        return;
    }
    gui.updatePlayerVictoryPointsAndBadges(player);
    if (previousPlayerWithLongestRoad != null) {
      return gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithLongestRoad);
    }
  });
  return dialog.show();
};