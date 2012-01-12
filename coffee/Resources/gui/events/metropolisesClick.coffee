# This event handles the clicking of the dashboard item which displays the metropolises window.
# Namespace table in gui for easy access when updating ownership of metropolises.

events.metropolisesClick = (player) ->

  gui.metropolisesTableSection = Ti.UI.createTableViewSection()

  # Create rows for each type of metropolis and add to table section.
  for metropolisType in Metropolis.types
    gui.metropolisesTableSection.add(createMetropolisRow(metropolisType, player))

  gui.metropolisesTable = Ti.UI.createTableView(
    data: [gui.metropolisesTableSection],
    style: Ti.UI.iPhone.TableViewStyle.GROUPED,
    separatorColor: 'transparent',
    scrollable: false,
  )

  # Create modal window with player's metropolises.
  metropolisesWindow = Ti.UI.createWindow
    title: 'Metropolises',
  metropolisesWindow.add(gui.metropolisesTable)

  # Done button.
  doneButton = Ti.UI.createButton({
    title: 'Done',
    style: Ti.UI.iPhone.SystemButtonStyle.DONE,
  })
  doneButton.addEventListener('click', ->
    metropolisesWindow.close()
  )
  metropolisesWindow.setLeftNavButton(doneButton)

  # Show window as modal.
  metropolisesWindow.open(
    modal: true,
    modalStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
  )
