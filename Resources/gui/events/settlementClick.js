var settlementClick, settlementEvents;
settlementEvents = {
  BUILD: 'Build',
  UPGRADE: 'Upgrade to city',
  DESTROY: 'Destroy',
  CANCEL: 'Cancel'
};
settlementClick = function(player) {
  var dialog, key, options, settlements, value;
  settlements = player.settlements;
  options = [];
  for (key in settlementEvents) {
    value = settlementEvents[key];
    options.push(value);
  }
  dialog = Ti.UI.createOptionDialog({
    options: options,
    destructive: options.indexOf(settlementEvents['DESTROY']),
    cancel: options.indexOf(settlementEvents['CANCEL']),
    title: '' + settlements.inPlay().length + '/' + settlements.length + ' settlements built'
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case settlementEvents.BUILD:
        if (player.canBuildSettlement()) {
          player.buildSettlement();
        } else {
          illegalActionAlert('No settlements left to build');
          return;
        }
        break;
      case settlementEvents.UPGRADE:
        if (!player.hasCitiesToBuild()) {
          illegalActionAlert('No cities left to build');
          return;
        } else if (!player.hasSettlementsToUpgrade()) {
          illegalActionAlert('No settlements to upgrade');
          return;
        } else {
          player.buildCity();
        }
        break;
      case settlementEvents.DESTROY:
        player.destroySettlement();
        break;
      case settlementEvents.CANCEL:
        return;
    }
    gui.updateBadges(player);
    return gui.updatePlayerVictoryPoints(player);
  });
  return dialog.show();
};