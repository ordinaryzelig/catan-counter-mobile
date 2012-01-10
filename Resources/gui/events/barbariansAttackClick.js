events.barbariansAttack = function() {
  var attackAlert, outcome;
  outcome = game.barbarians.attack();
  attackAlert = confirmationAlert('Are you sure?', outcome.summary);
  attackAlert.addEventListener('click', function(event) {
    if (event.index !== event.cancel) {
      outcome.apply();
      gui.updateAllPlayersVictoryPointsAndBadges();
      gui.updateAttackStrengths();
      return gui.updateBarbariansView();
    }
  });
  return attackAlert.show();
};