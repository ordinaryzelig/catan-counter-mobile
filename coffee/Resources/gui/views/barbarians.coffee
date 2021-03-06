# Display barbarian strength vs total player knight strength.
# List players and knight strength in descending order of knight strength.
# Tapping on player brings up knight modal window like tapping in player's dashboard.

gui.barbariansWindow = Ti.UI.createWindow(
  title: 'Homeland Security'
)

# Create tab.
# Tab will be added/removed when new game created.
gui.barbariansTab = Ti.UI.createTab(
  window: gui.barbariansWindow,
  icon:   tabsPath('barbarians.png'),
  title:  'Barbarians'
)

matchupHeaderView = Ti.UI.createView(
  height: 80,
)

matchup = {}
edgeMargin = 10
matchup.barbarians = createBarbariansAttackTeamView('barbarians', left: edgeMargin)
matchup.catan      = createBarbariansAttackTeamView('catan',      right: edgeMargin)

matchupHeaderView.add(matchup.barbarians)
matchupHeaderView.add(matchup.catan)

# Attack buttons.
barbariansAttackButton = Ti.UI.createButton(
    title:  'Barbarians Attack!',
    height: 40,
    width:  160,
  )

matchupHeaderView.add(barbariansAttackButton)

barbariansAttackButton.addEventListener('click', ->
  events.barbariansAttack()
)

gui.knightStrengthTable = Ti.UI.createTableView(
  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
  headerView: matchupHeaderView,
)

# When tapped, bring up player's modal knight window.
# Same as tapping player's knight dashboard item.
gui.knightStrengthTable.addEventListener('click', (event) ->
  player = game.playerByColor(event.row.playerColor)
  events.knightsClick(player)
)

gui.barbariansWindow.add(gui.knightStrengthTable)
