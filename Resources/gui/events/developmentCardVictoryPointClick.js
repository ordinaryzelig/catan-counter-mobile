var developmentCardVictoryPointEvents;
developmentCardVictoryPointEvents = {
  SHOW: 'Show all development cards',
  CANCEL: 'Cancel'
};
events.developmentCardVictoryPointClick = function(player) {
  var dialog, key, options, title, value;
  options = [];
  for (key in developmentCardVictoryPointEvents) {
    value = developmentCardVictoryPointEvents[key];
    options.push(value);
  }
  title = "End the game by showing player's development card victory points";
  dialog = Ti.UI.createOptionDialog({
    options: options,
    cancel: options.indexOf(developmentCardVictoryPointEvents['CANCEL']),
    title: title
  });
  dialog.addEventListener('click', function(event) {
    var conAlert, message;
    switch (options[event.index]) {
      case developmentCardVictoryPointEvents.SHOW:
        if (player.canWinByShowingAllDevelopmentCardVictoryPoints()) {
          title = 'Show all cards and end game?';
          message = "" + player.color + " needs to reveal at least " + (pluralize('development card victory point', player.numDevelopmentCardVictoryPointsNeededToWin())) + " to win";
          conAlert = confirmationAlert(title, message);
          conAlert.addEventListener('click', function(event) {
            if (event.index !== event.cancel) {
              player.winByPlayingDevelopmentCardVictoryPoints();
              return gui.updatePlayerVictoryPointsAndBadges(player);
            }
          });
          return conAlert.show();
        } else {
          illegalActionAlert('Player does not have enough points to win with development card victory points');
        }
        break;
      case developmentCardVictoryPointEvents.CANCEL:
    }
  });
  return dialog.show();
};