# This event handles the clicking of one of the 3 metropolises.
# Here, a user specifies which metropolis to perform an action on.

metropolisEvents = {
  AWARD:  'Take metropolis',
  REMOVE: 'Remove metropolis',
  CANCEL: 'Cancel',
}

events.metropolisClick = (metropolisType, player) ->

  metropolis = game.metropolisesByType()[metropolisType]
  previousPlayerWithMetropolis = metropolis.player

  # Construct option dialog.
  options = []
  for key, value of metropolisEvents
    options.push value
  title = if previousPlayerWithMetropolis? then "#{previousPlayerWithMetropolis.color} owns #{metropolis.type} metropolis" else ''
  dialog = Ti.UI.createOptionDialog
    options: options
    cancel:  options.indexOf(metropolisEvents['CANCEL'])
    destructive: options.indexOf(metropolisEvents['REMOVE'])
    title: title

  # Handle clicks.
  dialog.addEventListener 'click', (event) ->
    switch options[event.index]

      # Give metropolis to player if they don't already have it.
      when metropolisEvents.AWARD
        playerAlreadyHasMetropolis = metropolis.player == player
        if playerAlreadyHasMetropolis
          illegalActionAlert "Player already has #{metropolis.type} metropolis"
          return
        else
          if previousPlayerWithMetropolis?
            basicAlert "#{metropolis.type} metropolis stolen", "#{metropolis.type} metropolis was stolen from #{previousPlayerWithMetropolis.color}"
          player.takeMetropolis(metropolis)

      # Remove metropolis from player.
      when metropolisEvents.REMOVE
        if metropolis.player == player
          metropolis.unaward()
        else
          illegalActionAlert "Player does not have #{metropolis.type} metropolis"
          return

      # Cancel.
      when metropolisEvents.CANCEL
        return

    # Update GUI.
    gui.updatePlayerVictoryPointsAndBadges(player)
    gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithMetropolis) if previousPlayerWithMetropolis?

  dialog.show()
