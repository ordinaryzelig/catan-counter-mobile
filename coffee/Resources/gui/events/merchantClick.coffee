merchantEvents = {
  AWARD:  'Take merchant',
  REMOVE: 'Remove merchant',
  CANCEL: 'Cancel',
}

events.merchantClick = (player) ->

  previousPlayerWithMerchant = game.merchant.player

  # Construct option dialog.
  options = []
  for key, value of merchantEvents
    options.push value
  title = if previousPlayerWithMerchant? then "#{previousPlayerWithMerchant.color} has the merchant" else ''
  dialog = Ti.UI.createOptionDialog
    options: options
    cancel: options.indexOf(merchantEvents['CANCEL'])
    destructive: 1
    title: title

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when merchantEvents.AWARD
        if player.hasMerchant()
          illegalActionAlert 'Player already has merchant'
        else
          if previousPlayerWithMerchant?
            basicAlert 'Merchant stolen', "Merchant was stolen from #{previousPlayerWithMerchant.color}"
          player.takeMerchant()
      when merchantEvents.REMOVE
        if player.hasMerchant()
          game.merchant.player = null
        else
          illegalActionAlert 'Player does not have the merchant'
          return
      when merchantEvents.CANCEL
        return
    gui.updatePlayerVictoryPointsAndBadges(player)
    gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithMerchant) if previousPlayerWithMerchant?
  )

  dialog.show()
