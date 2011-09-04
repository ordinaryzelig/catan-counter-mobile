soldierEvents = {
  PLAY:    'Play knight card',
  REMOVE:  'Remove knight card',
  CANCEL:  'Cancel',
}

events.soldierClick = (player) ->

  previousPlayerWithLargestArmy = game.largestArmy.player

  # Construct option dialog.
  options = []
  for key, value of soldierEvents
    options.push value
  title = if previousPlayerWithLargestArmy?
    "#{previousPlayerWithLargestArmy.color} has the largest army with #{previousPlayerWithLargestArmy.soldiers.length} knights"
  else
    'Nobody has the largest army yet'
  dialog = Ti.UI.createOptionDialog({
    options: options
    cancel: options.indexOf(soldierEvents['CANCEL']),
    destructive: 1,
    title: title,
  })

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]

      # Play soldier card.
      when soldierEvents.PLAY
        if game.soldiers.notInPlay().length > 0
          hadLargestArmyBefore = player.hasLargestArmy()
          player.playSoldier()
          justObtainedLargestArmy = !hadLargestArmyBefore and player.hasLargestArmy()
          if justObtainedLargestArmy
            if previousPlayerWithLargestArmy?
              message = "Largest army was stolen from #{previousPlayerWithLargestArmy.color}" if previousPlayerWithLargestArmy != player
            else
              message = "#{player.color} is awarded the largest army"
            basicAlert 'Largest army', message
        else
          illegalActionAlert('No more knights left')
          return

      # Remove soldier card.
      when soldierEvents.REMOVE
        numSoldiers = player.soldiers.length
        if numSoldiers > 0
          player.destroySoldier()
        else
          illegalActionAlert 'Player has no knights'
          return

      # Cancel.
      when soldierEvents.CANCEL
        return
    gui.updatePlayerVictoryPointsAndBadges(player)
    gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithLargestArmy) if previousPlayerWithLargestArmy? and previousPlayerWithLargestArmy != player
  )

  dialog.show()
