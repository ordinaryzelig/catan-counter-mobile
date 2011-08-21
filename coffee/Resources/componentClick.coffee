Titanium.include('settlementClick.js')
Titanium.include('cityClick.js')

componentClick = (event) ->
  item = event.item
  switch item.componentType
    when 'settlement'
      settlementClick(gui.currentPlayer)
    when 'city'
      cityClick(gui.currentPlayer)
