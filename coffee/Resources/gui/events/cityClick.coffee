cityEvents = {
  BUILD:   'Build from settlement',
  DOWNGRADE: 'Downgrade to settlement',
  CANCEL:  'Cancel',
}

cityClick = (player) ->

  # Construct option dialog.
  cities = player.cities
  options = []
  for key, value of cityEvents
    options.push value
  dialog = Ti.UI.createOptionDialog({
    options: options
    destructive: options.indexOf(cityEvents['DOWNGRADE']),
    cancel: options.indexOf(cityEvents['CANCEL']),
    title: '' + cities.inPlay().length + '/' + cities.length + ' cities built',
  })

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    updateGui = false
    switch options[event.index]
      when cityEvents.BUILD
        if !player.hasSettlementsToUpgrade()
          illegalActionAlert 'No upgradable settlements'
        else if !player.hasCitiesToBuild()
          illegalActionAlert 'No cities left to build'
        else
          player.buildCity()
          updateGui = true
      when cityEvents.DOWNGRADE
        if player.destroysCityIfDowngraded()
          basicAlert 'No settlements to build', 'City was completely distroyed'
        player.downgradeCity()
        updateGui = true
      when cityEvents.CANCEL
        return
    if updateGui
      gui.updatePlayerVictoryPoints(player)
      gui.updateBadges(player)
  )

  dialog.show()
