events = {}

for componentType in ['settlement', 'city', 'longestRoad', 'soldier', 'developmentCardVictoryPoint']
  Ti.include(eventsPath("#{componentType}Click.js"))

componentClick = (event) ->
  item = event.item
  # E.g. settlementClick(gui.currentPlayer).
  functionName = "#{item.componentType}Click"
  fxn = events[functionName]
  fxn.apply(@, [gui.currentPlayer])
