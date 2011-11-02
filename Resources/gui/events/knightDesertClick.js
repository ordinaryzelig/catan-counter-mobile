events.knightDesertClick = function(knight) {
  var color, dialog, opponentColors, options, _i, _len;
  options = [];
  opponentColors = gui.colorOrder();
  opponentColors.splice(opponentColors.indexOf(knight.player.color), 1);
  for (_i = 0, _len = opponentColors.length; _i < _len; _i++) {
    color = opponentColors[_i];
    options.push(color);
  }
  options.push('Nobody');
  options.push('Cancel');
  dialog = Ti.UI.createOptionDialog({
    options: options,
    destructive: opponentColors.length,
    cancel: opponentColors.length + 1
  });
  dialog.addEventListener('click', function(event) {
    var otherPlayer, otherPlayerColor, otherPlayerKnight;
    switch (event.index) {
      case event.destructive:
        knight.destroy();
        gui.removeKnightRow(knight);
        break;
      case event.cancel:
        return;
      default:
        otherPlayerColor = options[event.index];
        otherPlayer = game.playersByColor[otherPlayerColor];
        otherPlayerKnight = knight.desertFor(otherPlayer);
        gui.removeKnightRow(knight);
        if (otherPlayerKnight != null) {
          gui.updateBadges(otherPlayer);
          alert(otherPlayer.color + ' gains a ' + otherPlayerKnight.humanize());
        } else {
          alert(otherPlayer.color + ' already has 2 level ' + knight.level + ' knights.');
        }
    }
    return gui.updateBadges(knight.player);
  });
  return dialog.show();
};