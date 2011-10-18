gui.showNewGameWindow = ->

  fontOptions = {
    fontSize: 16,
    fontWeight: 'bold',
  }

  # Create window.
  newGameWindow = Ti.UI.createWindow()

  expansions = []

  # Each expansion is a row with an on/off switch.
  expansionsTable = Ti.UI.createTableViewSection({
    headerTitle: 'Choose expansions',
  })
  for expansion in Game.EXPANSIONS
    row = Ti.UI.createTableViewRow()
    label = Ti.UI.createLabel({
      text: expansion.name,
      left: 10,
      font: fontOptions,
    })
    row.add(label)
    onOffSwitch = Ti.UI.createSwitch({
      value: false,
      right: 10,
    })
    # When switched on, add expansion to expansions array.
    # When switched off, remove from array.
    onOffSwitch.addEventListener('change', (event) ->
      if event.value
        expansions.push(expansion)
      else
        expansions.splice(expansions.indexOf(expansion), 1)
    )
    row.add(onOffSwitch)
    row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
    expansionsTable.add(row)

  # Get expansions that are switched on.
  expansionsTable.expansions = ->
    expansions = []
    for onOffSwitch in @switches
      expansions.push(onOffSwitch.expansion) if onOffSwitch.value
    expansions

  buttonsView = Ti.UI.createView({
    height: 80,
  })

  buttonHeight = 40
  buttonWidth =  140
  buttonOffset = 15
  # Cancel button.
  cancelButton = Ti.UI.createButton({
    title: 'Cancel',
    height: buttonHeight,
    width: buttonWidth,
    font:  fontOptions,
    left: buttonOffset,
  })

  # When tapped, close window.
  cancelButton.addEventListener('click', ->
    newGameWindow.close()
  )
  buttonsView.add(cancelButton)

  # Add button to create game.
  createGameButton = Ti.UI.createButton({
    title: 'Create game',
    height: buttonHeight,
    width: buttonWidth,
    font:  fontOptions,
    right: buttonOffset,
  })

  # When clicked, create game with settings.
  createGameButton.addEventListener('click', ->
    settings = new GameSettings(expansions: expansions)
    gui.createNewGame(settings)
    newGameWindow.close()
  )
  buttonsView.add(createGameButton)

  expansionsTable.footerView = buttonsView

  table = Ti.UI.createTableView({
    data: [expansionsTable],
    scrollabel: false,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED,
    separatorColor:  'transparent',
  })

  newGameWindow.add(table)

  # Show window as modal.
  newGameWindow.open({
    modal: true,
    modalStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
  })
