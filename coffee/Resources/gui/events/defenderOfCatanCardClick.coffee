# This event handles the clicking of the dashboard item which displays an option dialog.
# Only choices are to remove a card or cancel.

defenderOfCatanCardEvents =
  DISCARD: 'Discard defender of Catan card'
  CANCE:  'Cancel'

events.defenderOfCatanCardClick = (player) ->

  # Construct option dialog.
  defenderOfCatanCards = player.defenderOfCatanCards
  options = []
  for key, value of defenderOfCatanCardEvents
    options.push value
  dialog = Ti.UI.createOptionDialog
    options: options
    destructive: options.indexOf(defenderOfCatanCardEvents['DISCARD'])
    cancel: options.indexOf(defenderOfCatanCardEvents['CANCEL'])

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]

      # Discard if player has any.
      when defenderOfCatanCardEvents.DISCARD
        if player.defenderOfCatanCards.length
          player.discardDefenderOfCatanCard()
        else
          illegalActionAlert 'Player has no defender of Catan cards'

      # Cancel.
      when defenderOfCatanCardEvents.CANCEL
        return
    gui.updatePlayerVictoryPointsAndBadges(player)
  )

  dialog.show()
