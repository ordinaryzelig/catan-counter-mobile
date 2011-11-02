# This even handles the clicking of the dashboard item which displays the knights window.
# Namespace knightsTable and knightsTableSection to make it available when deserting knight.

events.knightsClick = (player) ->

  gui.knightsTableSection = Ti.UI.createTableViewSection()

  # Header.
  gui.setKnightsTableSectionHeaderTitle(gui.knightsTableSection, player.knights.inPlay().length)

  # Create rows of knights and add to table section.
  for knight in player.knights.inPlay()
    gui.knightsTableSection.add(createKnightRow(knight))

  gui.knightsTable = Ti.UI.createTableView(
    data: [gui.knightsTableSection],
    style: Ti.UI.iPhone.TableViewStyle.GROUPED,
    separatorColor: 'transparent',
    scrollable: false,
  )

  # Create modal window with player's knights.
  knightsWindow = Ti.UI.createWindow(
    title: player.color + ' knights',
  )
  knightsWindow.add(gui.knightsTable)

  # Add add knight button.
  addKnightButton = Ti.UI.createButton(
    systemButton: Titanium.UI.iPhone.SystemButton.ADD,
    playerColor:  player.color,
  )
  addKnightButton.addEventListener('click', (event) ->
    player = game.playersByColor[event.source.playerColor]
    if player.canBuildKnight()
      knight = player.buildKnight()
      row = createKnightRow(knight)
      gui.knightsTableSection.add(row)
      gui.knightsTable.data = [gui.knightsTableSection]
      gui.setKnightsTableSectionHeaderTitle(gui.knightsTableSection, player.knights.inPlay().length)
    else
      alert('Player has no level 1 knights to build')
  )
  knightsWindow.setRightNavButton(addKnightButton)

  # Done button.
  doneButton = Ti.UI.createButton({
    title: 'Done',
    style: Ti.UI.iPhone.SystemButtonStyle.DONE,
  })
  doneButton.addEventListener('click', ->
    knightsWindow.close()
  )
  knightsWindow.setLeftNavButton(doneButton)

  # Show window as modal.
  knightsWindow.open(
    modal: true,
    modalStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
  )
