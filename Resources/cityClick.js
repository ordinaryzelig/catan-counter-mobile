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
  dialog = Titanium.UI.createOptionDialog({
    options: options,
    destructive: options.indexOf(cityEvents['DOWNGRADE']),
    cancel: options.indexOf(cityEvents['CANCEL']),
    title: '' + cities.inPlay().length + '/' + cities.length + ' cities built'
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case cityEvents.BUILD:
        player.buildCity();
        break;
      case cityEvents.DOWNGRADE:
        player.downgradeCity();
        break;
      case cityEvents.CANCEL:
        return;
    }
    gui.updatePlayerVictoryPoints(player);
    return gui.updateBadges(player);
  });
  return dialog.show();
};