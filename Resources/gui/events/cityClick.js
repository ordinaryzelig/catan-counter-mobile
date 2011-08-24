var cityEvents;
cityEvents = {
  BUILD: 'Upgrade settlement to city',
  DOWNGRADE: 'Downgrade to settlement',
  CANCEL: 'Cancel'
};
events.cityClick = function(player) {
  var cities, dialog, key, options, value;
  cities = player.cities;
  options = [];
  for (key in cityEvents) {
    value = cityEvents[key];
    options.push(value);
  }
  dialog = Ti.UI.createOptionDialog({
    options: options,
    destructive: options.indexOf(cityEvents['DOWNGRADE']),
    cancel: options.indexOf(cityEvents['CANCEL']),
    title: cities.inPlay().length + '/' + cities.length + ' cities built'
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case cityEvents.BUILD:
        if (!player.hasSettlementsToUpgrade()) {
          illegalActionAlert('No upgradable settlements');
          return;
        } else if (!player.hasCitiesToBuild()) {
          illegalActionAlert('No cities left to build');
          return;
        } else {
          player.buildCity();
        }
        break;
      case cityEvents.DOWNGRADE:
        if (player.destroysCityIfDowngraded()) {
          basicAlert('No settlements to build', 'City was completely destroyed');
        }
        player.downgradeCity();
        break;
      case cityEvents.CANCEL:
        return;
    }
    return gui.updatePlayerVictoryPointsAndBadges(player);
  });
  return dialog.show();
};