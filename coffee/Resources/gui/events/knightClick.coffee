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

      # Activate.
      when knightEvents.ACTIVATE
        if knight.active
          alert 'Knight is already active'
          return
        else
          knight.activate()

       # Deactivate.
      when knightEvents.DEACTIVATE
        if knight.active
          knight.deactivate()
        else
          alert 'Knight is already inactive'
          return

      # Promote.
      when knightEvents.PROMOTE
        switch knight.level
          when 1, 2
            if knight.canBePromoted()
              knight = knight.promote()
            else
              alert "There are no available level #{knight.level + 1} knights"
              return
          when 3
            alert 'Level 3 Knight cannot be promoted'
            return
      # Desert.
      when knightEvents.DESERT
        events.knightDesertClick(knight)

       # Cancel.
      when knightEvents.CANCEL
        return

    knight.button.image = knightImagePath(knight)
    gui.updateBarbariansView()
    gui.updateBadges(knight.player)
  )

  dialog.show()
