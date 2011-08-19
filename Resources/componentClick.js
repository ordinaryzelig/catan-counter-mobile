var componentClick;
Titanium.include('settlementClick.js');
Titanium.include('cityClick.js');
componentClick = function(event) {
  var item;
  item = event.item;
  switch (item.componentType) {
    case 'settlement':
      return settlementClick(currentPlayer());
    case 'city':
      return cityClick(currentPlayer());
  }
};