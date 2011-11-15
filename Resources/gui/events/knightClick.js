var knightEvents;
knightEvents = {
  ACTIVATE: 'Activate',
  DEACTIVATE: 'Deactivate',
  PROMOTE: 'Promote',
  DESERT: 'Desert',
  CANCEL: 'Cancel'
};
events.knightClick = function(knight) {
  var dialog, key, options, value;
  options = [];
  for (key in knightEvents) {
    value = knightEvents[key];
    options.push(value);
  }
  dialog = Ti.UI.createOptionDialog({
    options: options,
    destructive: options.indexOf(knightEvents['DESERT']),
    cancel: options.indexOf(knightEvents['CANCEL'])
  });
  dialog.addEventListener('click', function(event) {
    switch (options[event.index]) {
      case knightEvents.ACTIVATE:
        if (knight.active) {
          alert('Knight is already active');
          return;
        } else {
          knight.activate();
        }
        break;
      case knightEvents.DEACTIVATE:
        if (knight.active) {
          knight.deactivate();
        } else {
          alert('Knight is already inactive');
          return;
        }
        break;
      case knightEvents.PROMOTE:
        if (knight.level === 1) {
          knight = knight.promote();
        } else if (knight.level === 2) {
          if (knight.player.canPromoteToMightyKnight()) {
            knight = knight.promote();
          } else {
            alert('Player cannot yet promote to mighty knights');
            return;
          }
        } else {
          alert('Level 3 Knight cannot be promoted');
          return;
        }
        break;
      case knightEvents.DESERT:
        events.knightDesertClick(knight);
        break;
      case knightEvents.CANCEL:
        return;
    }
    knight.button.image = knightImagePath(knight);
    gui.updateBarbariansView();
    return gui.updateBadges(knight.player);
  });
  return dialog.show();
};