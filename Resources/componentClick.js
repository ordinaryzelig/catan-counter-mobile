var componentClick;
Titanium.include('settlementClick.js');
componentClick = function(event) {
  var component;
  component = event.item;
  return settlementClick(currentPlayer(), component);
};