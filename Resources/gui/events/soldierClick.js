var soldierEvents;
soldierEvents = {
  PLAY: 'Play knight card',
  CANCEL: 'Cancel'
};
events.soldierClick = function(player) {
  var dialog, key, options, previousPlayerWithLargestArmy, title, value;
  previousPlayerWithLargestArmy = game.largestArmy.player;
  options = [];
  for (key in soldierEvents) {
    value = soldierEvents[key];
    options.push(value);
  }
  title = previousPlayerWithLargestArmy != null ? "" + previousPlayerWithLargestArmy.color + " has the largest army with " + previousPlayerWithLargestArmy.soldiers.length + " soldiers" : '';
  dialog = Ti.UI.createOptionDialog({
    options: options,
    cancel: options.indexOf(soldierEvents['CANCEL']),
    title: title
  });
  dialog.addEventListener('click', function(event) {
    var hadLargestArmyBefore, justObtainedLargestArmy, message;
    switch (options[event.index]) {
      case soldierEvents.PLAY:
        hadLargestArmyBefore = player.hasLargestArmy();
        player.playSoldier();
        justObtainedLargestArmy = !hadLargestArmyBefore && player.hasLargestArmy();
        if (justObtainedLargestArmy) {
          if (previousPlayerWithLargestArmy != null) {
            if (previousPlayerWithLargestArmy !== player) {
              message = "Largest army was stolen from " + previousPlayerWithLargestArmy.color;
            }
          } else {
            message = "" + player.color + " is awarded the largest army";
          }
          basicAlert('Largest army', message);
        }
        break;
      case soldierEvents.CANCEL:
        return;
    }
    gui.updatePlayerVictoryPointsAndBadges(player);
    if ((previousPlayerWithLargestArmy != null) && previousPlayerWithLargestArmy !== player) {
      return gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithLargestArmy);
    }
  });
  return dialog.show();
};