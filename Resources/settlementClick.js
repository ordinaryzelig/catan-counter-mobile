var settlementClick, settlementEvents;
settlementEvents = {
  BUILD: 'Build',
  UPGRADE: 'Upgrade to city',
  DESTROY: 'Destroy',
  CANCEL: 'Cancel'
};
settlementClick = function(player, component) {
  var dialog, key, options, settlements, value;
  settlements = player.settlements;
  options = [];
  for (key in settlementEvents) {
    value = settlementEvents[key];
    options.push(value);
  }
  dialog = Titanium.UI.createOptionDialog({
    options: options,
    destructive: options.indexOf(settlementEvents['DESTROY']),
    cancel: options.indexOf(settlementEvents['CANCEL']),
    title: '' + settlements.inPlay().length + '/' + settlements.length + ' settlements built'
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case settlementEvents.BUILD:
        player.buildSettlement();
        break;
      case settlementEvents.UPGRADE:
        player.buildCity();
        break;
      case settlementEvents.CANCEL:
        return;
    }
    gui.changeTitle(player);
    return gui.updateBadges();
  });
  return dialog.show();
};