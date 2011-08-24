longestRoadEvents = {
  AWARD: 'Take longest road',
  CANCEL:  'Cancel',
}

events.longestRoadClick = (player) ->

  previousPlayerWithLongestRoad = game.longestRoad.player

  # Construct option dialog.
  options = []
  for key, value of longestRoadEvents
    options.push value
  title = if previousPlayerWithLongestRoad? then "#{previousPlayerWithLongestRoad.color} has the longest road" else ''
  dialog = Ti.UI.createOptionDialog({
    options: options
    cancel: options.indexOf(longestRoadEvents['CANCEL']),
    title: title
  })

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when longestRoadEvents.AWARD
        if player.hasLongestRoad()
          illegalActionAlert 'Player already has longest road'
        else
          if previousPlayerWithLongestRoad?
            basicAlert 'Longest road stolen', "Longest road was stolen from #{previousPlayerWithLongestRoad.color}"
          player.takeLongestRoad()
      when longestRoadEvents.CANCEL
        return
    gui.updatePlayerVictoryPointsAndBadges(player)
    gui.updatePlayerVictoryPointsAndBadges(previousPlayerWithLongestRoad) if previousPlayerWithLongestRoad?
  )

  dialog.show()
