var longestRoadEvents;
longestRoadEvents = {
  AWARD: 'Take longest road',
  REMOVE: 'Remove longest road',
  CANCEL: 'Cancel'
};
events.longestRoadClick = function(player) {
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
    destructive: 1,
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
      case longestRoadEvents.REMOVE:
        if (player.hasLongestRoad()) {
          game.longestRoad.player = null;
        } else {
          illegalActionAlert('Player does not have the longest road');
          return;
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