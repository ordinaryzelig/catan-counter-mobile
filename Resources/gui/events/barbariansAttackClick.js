events.barbariansAttack = function() {
  var attackAlert, outcome;
  outcome = game.barbarians.attack();
  attackAlert = confirmationAlert('Are you sure?', outcome.summary);
  attackAlert.addEventListener('click', function(event) {
    var player, _i, _len, _ref;
    if (event.index !== event.cancel) {
      outcome.apply();
      _ref = game.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        gui.updatePlayerVictoryPointsAndBadges(player);
      }
      gui.updateAttackStrengths();
      return gui.updateBarbariansView();
    }
  });
  return attackAlert.show();
};