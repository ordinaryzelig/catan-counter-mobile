# Create tab group (black bar at bottom and title bar at top).

gui.navigation = Ti.UI.createTabGroup()

# Tabs.
for navTab in ['gameMenu', 'players']
  Ti.include('/gui/views/' + navTab + '.js')
# For some reason, players tab is halting the above for loop.
for navTab in ['barbarians']
  Ti.include('/gui/views/' + navTab + '.js')
