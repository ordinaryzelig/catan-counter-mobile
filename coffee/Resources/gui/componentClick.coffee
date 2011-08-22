Ti.include('/gui/settlementClick.js')
Ti.include('/gui/cityClick.js')

componentClick = (event) ->
  item = event.item
  switch item.componentType
    when 'settlement'
      settlementClick(gui.currentPlayer)
    when 'city'
      cityClick(gui.currentPlayer)
