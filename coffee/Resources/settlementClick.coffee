settlementEvents = {
  BUILD:   'Build',
  UPGRADE: 'Upgrade to city',
  DESTROY: 'Destroy',
  CANCEL:  'Cancel',
}

settlementClick = (player) ->
  settlements = player.settlements
  options = []
  for key, value of settlementEvents
    options.push value
  dialog = Titanium.UI.createOptionDialog({
    options: options
    destructive: options.indexOf(settlementEvents['DESTROY']),
    cancel: options.indexOf(settlementEvents['CANCEL']),
    title: '' + settlements.inPlay().length + '/' + settlements.length + ' settlements built',
  })
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when settlementEvents.BUILD
        player.buildSettlement()
      when settlementEvents.UPGRADE
        player.buildCity()
      when settlementEvents.DESTROY
        player.destroySettlement()
      when settlementEvents.CANCEL
        return
    gui.changeTitle(player)
    gui.updateBadges(player)
  )
  dialog.show()
