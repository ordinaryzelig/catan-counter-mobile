events.knightDesertClick = (knight) ->
  options = []

  # Create option for each opponent's color, one for 'Nobody', and one for 'Cancel'.
  opponentColors = gui.colorOrder()
  opponentColors.splice(opponentColors.indexOf(knight.player.color), 1)
  for color in opponentColors
    options.push color
  options.push('Nobody')
  options.push('Cancel')

  dialog = Ti.UI.createOptionDialog(
    options:     options,
    destructive: opponentColors.length,
    cancel:      opponentColors.length + 1,
  )

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch event.index
      when event.destructive
        knight.destroy()
        gui.removeKnightRow(knight)
      when event.cancel
        return
      else
        # Desert to another player.
        otherPlayerColor = options[event.index]
        otherPlayer = game.playerByColor(otherPlayerColor)
        otherPlayerKnight = knight.desertFor(otherPlayer)
        gui.removeKnightRow(knight)
        if otherPlayerKnight?
          gui.updateBadges(otherPlayer)
          alert otherPlayer.color + ' gains a ' + otherPlayerKnight.humanize()
        else
          alert otherPlayer.color + ' already has 2 level ' + knight.level + ' knights.'
    gui.updateBarbariansView()
    gui.updateBadges(knight.player)
  )

  dialog.show()
