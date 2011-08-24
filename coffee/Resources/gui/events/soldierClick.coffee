soldierEvents = {
  PLAY:    'Play knight card',
  CANCEL:  'Cancel',
}

soldierClick = (player) ->

  previousPlayerWithLargestArmy = game.largestArmy.player

  # Construct option dialog.
  options = []
  for key, value of soldierEvents
    options.push value
  title = if previousPlayerWithLargestArmy? then "#{previousPlayerWithLargestArmy.color} has the largest army with #{previousPlayerWithLargestArmy.soldiers.length} soldiers" else ''
  dialog = Ti.UI.createOptionDialog({
    options: options
    cancel: options.indexOf(soldierEvents['CANCEL']),
    title: title
  })

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when soldierEvents.PLAY
        hadLargestArmyBefore = player.hasLargestArmy()
        player.playSoldier()
        justObtainedLargestArmy = !hadLargestArmyBefore and player.hasLargestArmy()
        if justObtainedLargestArmy
          if previousPlayerWithLargestArmy?
            message = "Largest army was stolen from #{previousPlayerWithLargestArmy.color}" if previousPlayerWithLargestArmy != player
          else
            message = "#{player.color} is awarded the largest army"
          basicAlert 'Largest army', message
      when soldierEvents.CANCEL
        return
    gui.updatePlayerVictoryPointsAndBadges(player)
    gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithLargestArmy) if previousPlayerWithLargestArmy? and previousPlayerWithLargestArmy != player
  )

  dialog.show()
