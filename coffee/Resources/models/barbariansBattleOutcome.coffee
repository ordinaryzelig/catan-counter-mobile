class BarbariansBattleOutcome

  constructor: (barbarians) ->
    @barbarians = barbarians
    @game = @barbarians.game
    @catanDefense = @barbarians.game.catanDefense
    # Determine winners/losers.
    @catanSuccessfullyDefends = @catanDefense.strength() >= @barbarians.strength()
    @barbariansWin = !@catanSuccessfullyDefends
    @calculateDefendersOfCatan()
    @calculatePlayersWhoLoseCity()
    @composeSummary()

  calculateDefendersOfCatan: ->
    @defendersOfCatan = if @catanSuccessfullyDefends then @game.playersWhoContributeMostKnights() else []

  calculatePlayersWhoLoseCity: ->
    @playersWhoLoseCity = if @barbariansWin then @game.playersNotImmuneWhoContributeLeastKnights() else []
    @playersWhoCompletelyLoseCity = []
    for player in @playersWhoLoseCity
      @playersWhoCompletelyLoseCity.push(player) unless player.canBuildSettlement()

  # A string that describes outcome.
  # i.e. who loses city, who is defender of Catan, etc.
  composeSummary: ->
    if @barbariansWin
      @summary = @cityLossSummary()
      @summary = "#{@summary} #{@completeCityLossSummary()}" if @playersWhoCompletelyLoseCity.length
    else
      @summary = @catanDefendedSummary()
    @summary

  # All players who will lose a city.
  cityLossSummary: ->
    colors = _.map(@playersWhoLoseCity, (player) -> ( player.color ))
    colors.join(', ') + ' will lose a city.'

  # All players who completely lose a city.
  completeCityLossSummary: ->
    colors = _.map(@playersWhoCompletelyLoseCity, (player) -> ( player.color ))
    colors.join(', ') + ' will completely lose a city.'

  # Return defender of catan or list of players who tied.
  catanDefendedSummary: ->
    if @defendersOfCatan.length > 1
      colors = _.map(@defendersOfCatan, (player) -> ( player.color ))
      "#{colors.join(', ')} will have defended Catan and receive a progress card."
    else
      "#{_.first(@defendersOfCatan).color} will be the Defender of Catan and receive 1 Victory Point."

  apply: ->
    if @barbariansWin
      for player in @playersWhoLoseCity
        player.downgradeCity()
    @deactivateAllKnights()

  deactivateAllKnights: ->
    for player in @game.players
      player.deactivateAllKnights()
