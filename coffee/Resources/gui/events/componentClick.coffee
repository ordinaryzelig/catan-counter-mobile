# When a dashboard item is tapped, delegate the event to the appropriate event handler.
# Each component's handler is in its own file of the same name.
# E.g. settlementClick, knightClick, etc.
componentClick = (event) ->
  item = event.item
  # E.g. settlementClick(gui.currentPlayer).
  functionName = "#{item.componentType}Click"
  fxn = events[functionName]
  fxn.apply(@, [gui.currentPlayer])
