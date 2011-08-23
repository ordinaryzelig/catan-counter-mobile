Ti.include('/gui/events/settlementClick.js')
Ti.include('/gui/events/cityClick.js')
Ti.include('/gui/events/longestRoadClick.js')

componentClick = (event) ->
  item = event.item
  switch item.componentType
    when 'settlement'
      settlementClick(gui.currentPlayer)
    when 'city'
      cityClick(gui.currentPlayer)
    when 'longest road'
      longestRoadClick(gui.currentPlayer)
