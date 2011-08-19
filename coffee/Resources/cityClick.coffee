cityEvents = {
  BUILD:   'Build from settlement',
  DOWNGRADE: 'Downgrade to settlement',
  CANCEL:  'Cancel',
}

cityClick = (player) ->
  cities = player.cities
  options = []
  for key, value of cityEvents
    options.push value
  dialog = Titanium.UI.createOptionDialog({
    options: options
    destructive: options.indexOf(cityEvents['DOWNGRADE']),
    cancel: options.indexOf(cityEvents['CANCEL']),
    title: '' + cities.inPlay().length + '/' + cities.length + ' cities built',
  })
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when cityEvents.BUILD
        player.buildCity()
      when cityEvents.DOWNGRADE
        player.downgradeCity()
      when cityEvents.CANCEL
        return
    gui.changeTitle(player)
    gui.updateBadges(player)
  )
  dialog.show()
