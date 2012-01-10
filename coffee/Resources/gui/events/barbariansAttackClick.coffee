events.barbariansAttack = ->
  outcome = game.barbarians.attack()
  attackAlert = confirmationAlert('Are you sure?', outcome.summary)
  # If user clicks 'OK', apply outcome.
  # Otherwise, this is just a simulation.
  attackAlert.addEventListener 'click', (event) ->
    unless event.index == event.cancel
      outcome.apply()
      gui.updateAllPlayersVictoryPointsAndBadges()
      gui.updateAttackStrengths()
      gui.updateBarbariansView()
  attackAlert.show()
