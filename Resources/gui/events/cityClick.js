var cityClick, cityEvents;
cityEvents = {
  BUILD: 'Build from settlement',
  DOWNGRADE: 'Downgrade to settlement',
  CANCEL: 'Cancel'
};
cityClick = function(player) {
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
    title: '' + cities.inPlay().length + '/' + cities.length + ' cities built'
  });
  dialog.addEventListener('click', function(event) {
    var updateGui;
    updateGui = false;
    switch (options[event.index]) {
      case cityEvents.BUILD:
        if (!player.hasSettlementsToUpgrade()) {
          illegalActionAlert('No upgradable settlements');
        } else if (!player.hasCitiesToBuild()) {
          illegalActionAlert('No cities left to build');
        } else {
          player.buildCity();
          updateGui = true;
        }
        break;
      case cityEvents.DOWNGRADE:
        if (player.destroysCityIfDowngraded()) {
          basicAlert('No settlements to build', 'City was completely distroyed');
        }
        player.downgradeCity();
        updateGui = true;
        break;
      case cityEvents.CANCEL:
        return;
    }
    if (updateGui) {
      gui.updatePlayerVictoryPoints(player);
      return gui.updateBadges(player);
    }
  });
  return dialog.show();
};