Titanium.include('settlementClick.js')
Titanium.include('cityClick.js')

componentClick = (event) ->
  item = event.item
  switch item.componentType
    when 'settlement'
      settlementClick(currentPlayer())
    when 'city'
      cityClick(currentPlayer())
