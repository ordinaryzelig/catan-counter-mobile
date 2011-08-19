Titanium.include('settlementClick.js')

componentClick = (event) ->
  component = event.item
  settlementClick(currentPlayer(), component)
