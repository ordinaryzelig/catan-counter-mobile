developmentCardVictoryPointEvents = {
  SHOW:    'Show all development cards',
  CANCEL:  'Cancel',
}

events.developmentCardVictoryPointClick = (player) ->

  # Construct option dialog.
  options = []
  for key, value of developmentCardVictoryPointEvents
    options.push value
  title = "End the game by showing player's development card victory points"
  dialog = Ti.UI.createOptionDialog({
    options: options
    cancel: options.indexOf(developmentCardVictoryPointEvents['CANCEL']),
    title: title
  })

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when developmentCardVictoryPointEvents.SHOW
        if player.canWinByShowingAllDevelopmentCardVictoryPoints()
          title = 'Show all cards and end game?'
          message = "#{player.color} needs to reveal at least #{pluralize('development card victory point', player.numDevelopmentCardVictoryPointsNeededToWin())} to win"
          conAlert = confirmationAlert title, message
          conAlert.addEventListener('click', (event) ->
            unless event.index == event.cancel # See note in helper.coffee.
              player.winByPlayingDevelopmentCardVictoryPoints()
              gui.updatePlayerVictoryPointsAndBadges(player)
          )
          conAlert.show()
        else
          illegalActionAlert 'Player does not have enough points to win with development card victory points'
          return
      when developmentCardVictoryPointEvents.CANCEL
        return
  )

  dialog.show()
