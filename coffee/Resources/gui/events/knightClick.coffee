# This event handles the individual knight click.

knightEvents = {
  ACTIVATE:   'Activate',
  DEACTIVATE: 'Deactivate',
  PROMOTE:    'Promote',
  DESERT:     'Desert',
  CANCEL:     'Cancel',
}

events.knightClick = (knight) ->

  # Conxtruct option dialog.
  options = []
  for key, value of knightEvents
    options.push value
  dialog =       Ti.UI.createOptionDialog(
    options:     options,
    destructive: options.indexOf(knightEvents['DESERT']),
    cancel:      options.indexOf(knightEvents['CANCEL']),
  )

  # Handle clicks.
  dialog.addEventListener('click', (event) ->
    switch options[event.index]
      when knightEvents.ACTIVATE
        if knight.active
          alert 'Knight is already active'
          return
        else
          knight.activate()
      when knightEvents.DEACTIVATE
        if knight.active
          knight.deactivate()
        else
          alert 'Knight is already inactive'
          return
      when knightEvents.PROMOTE
        if knight.level == 1
          knight = knight.promote()
        else if knight.level == 2
          if knight.player.canPromoteToMightyKnight()
            knight = knight.promote()
          else
            alert 'Player cannot yet promote to mighty knights'
            return
        else
          alert 'Level 3 Knight cannot be promoted'
          return
      when knightEvents.DESERT
        events.knightDesertClick(knight)
      when knightEvents.CANCEL
        return
    knight.button.image = knightImagePath(knight)
    gui.updateBarbariansView()
    gui.updateBadges(knight.player)
  )

  dialog.show()
