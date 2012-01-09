class BarbariansBattleOutcome

  constructor: (barbarians) ->
    @barbarians = barbarians
    @catanDefense = @barbarians.game.catanDefense
    @winner = if catanSuccessfullyDefends() then @catanDefense else @barbarians

  catanSuccessfullyDefends: ->
    @catanDefense.strength() >= @barbarians.strength()

  barbariansWin: ->
    !catanSuccessfullyDefends()
